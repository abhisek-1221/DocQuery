import { Pinecone, PineconeRecord} from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3-server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { Document , RecursiveCharacterTextSplitter} from "@pinecone-database/doc-splitter";
import { getEmbeddings } from "./embeddings";
import md5 from "md5";
import { convertToAscii } from "./utils";

export const getPineconeClient = async () => {
  return new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });
};

type PDFPage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};

export async function loadS3IntoPinecone(fileKey: string) {
  // 1. obtain the pdf -> downlaod and read from pdf
  console.log("downloading s3 into file system");
  const file_name = await downloadFromS3(fileKey);
  if (!file_name) {
    throw new Error("could not download from s3");
  }
  console.log("loading pdf into memory" + file_name);
  const loader = new PDFLoader(file_name);
  const pages = (await loader.load()) as PDFPage[];

  // 2 split and segment the pdf
  const documents = await Promise.all(pages.map(prepareDocumentForPinecone));
    console.log("step 2 split and segment the pdf:", documents.length, documents);
    
    // 3. vectorize and embed the individual segments
    const vectors = await Promise.all(documents.flat().map(embedDocument));
    console.log("step 3 vectorize and embed the individual segments", vectors.length, vectors);
    

    // 4. upload the vectors to pinecone
    const client = await getPineconeClient();
    const pineconeIndex = client.index(process.env.PINECONE_INDEX_NAME!);

    console.log("uploading to pinecone");
    const namespace = pineconeIndex.namespace(convertToAscii(fileKey));

    console.log("inserting vectors to pinecone");
    
    await namespace.upsert(vectors);

    return documents[0];
}

     async function embedDocument(doc: Document) {
      try {
        const embeddings = await getEmbeddings(doc.pageContent);
        const hash = md5(doc.pageContent);
        console.log("embedding document", hash, embeddings.length, doc.metadata.pageNumber, doc.metadata.text);
        
        return {
          id: hash,
          values: embeddings,
          metadata: {
            text: doc.metadata.text,
            pageNumber: doc.metadata.pageNumber,
          },
        } as PineconeRecord;
    }
    catch (error) {
      console.error("Error embedding document", error);
      throw error;
    }
}

export const truncateStringByBytes = (str: string, bytes: number) => {
   const encoder = new TextEncoder();
   return new TextDecoder('utf-8').decode(encoder.encode(str).slice(0, bytes));
};

async function prepareDocumentForPinecone(page: PDFPage) {
      let {pageContent, metadata} = page;
      pageContent = pageContent.replace(/\n/g, " ");
      //split the page content into characters
      const splitter = new RecursiveCharacterTextSplitter();
      const docs = splitter.splitDocuments([
        new Document({
          pageContent,
          metadata:{
            pageNumber: metadata.loc.pageNumber,
            text: truncateStringByBytes(pageContent, 36000)
          }
        })
      ]);
      console.log("splitting document",docs);
      
      return docs;
}