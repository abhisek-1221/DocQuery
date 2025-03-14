import { Pinecone } from "@pinecone-database/pinecone";
import { getPineconeClient } from "./pinecone";
import { convertToAscii } from "./utils";
import { getEmbeddings } from "./embeddings";

export async function getMatchesFromEmbeddings(embeddings: number[], fileKey: string) {
    try {
        const client = await getPineconeClient();

        const pineconeIndex = await client.index(process.env.PINECONE_INDEX_NAME!);
        const namespace = pineconeIndex.namespace(convertToAscii(fileKey));
        const queryResult = await namespace.query({
            topK: 5,
            vector: embeddings,
            includeMetadata: true,
          });
        return queryResult.matches || [];
    } catch (error) {
        console.error("Error getting matches from embeddings", error);
        throw error;
    }
}

export async function getContext(
    query: string,
    fileKey: string,
){
    const queryEmbeddings = await getEmbeddings(query);
    const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey);

    const qualifyingDocs = matches.filter(
        (match) => match.score && match.score > 0.7
    );

    type Metadata = {
      text: string;
      pageNumber: number;
    };
  
    let docs = qualifyingDocs.map((match) => (match.metadata as Metadata).text);
    // 5 vectors
    return docs.join("\n").substring(0, 3000);
}