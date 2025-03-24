import { getContext } from '@/lib/context';
import { db } from '@/lib/db';
import { createOpenAI } from '@ai-sdk/openai';
import {  streamText, StreamData, Message } from 'ai';
import { chats, messages as _messages } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { groq } from '@ai-sdk/groq';
import { tools } from '@/lib/ai/tools';


const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    compatibility: 'strict',
   // strict mode, enable when using the OpenAI API
  });

export async function POST(req:Request){
    try {
        const {messages, chatId, feature} = await req.json()

        if(feature === "DocumentRAG"){

        const _chats = await db.select().from(chats).where(eq(chats.id, chatId));
        if(_chats.length !=1){
            return NextResponse.json({error: "chat not found"}, {status: 404});
        }
        const fileKey = _chats[0].fileKey;
        const lastMessage = messages[messages.length - 1];
        const context = await getContext(lastMessage.content,fileKey);

        const prompt = {
          role: "system",
          content: `AI assistant is a cutting-edge, highly intelligent artificial intelligence specialized in e-commerce analytics.
          The traits of AI include expert knowledge in data analysis, sentiment analysis, keyword extraction, and providing actionable insights.
          AI is well-behaved, well-mannered, and always professional.
          AI is consistently insightful, clear, and dedicated to enhancing e-commerce strategies.
          AI assistant possesses comprehensive knowledge in e-commerce trends, customer behavior, and data-driven decision-making.
          AI is particularly adept at analyzing customer reviews, extracting sentiment, identifying key trends, and offering tailored recommendations.
          START CONTEXT BLOCK
          ${context}
          END OF CONTEXT BLOCK
          AI assistant will integrate any CONTEXT BLOCK that is provided to offer the most relevant and precise analysis.
          If the context does not include the answer to a question, the AI assistant will say, "I'm sorry, but I don't have the information to answer that question." However the AI assistant will still provide the best possible response based on the information available.
          AI assistant will not apologize for previous responses but will indicate that new data has been considered.
          AI assistant will only draw from the provided context and will not fabricate information.
          `,
      };
      

        const response = await streamText({
          model: openai("gpt-3.5-turbo"), 
            messages: [
                prompt,
                ...messages.filter((message: Message) => message.role === "user"),
              ],
              onFinish: async (completion) => {
                try{                  
                  // save user message into db
                      const lastMessage = messages[messages.length - 1];
                      await db.insert(_messages).values({
                        chatId,
                        content: lastMessage.content,
                        role: "user",
                      });
                  // save ai message into db
                  await db.insert(_messages).values({
                    chatId,
                    content: completion.text,
                    role: "system",
                  });
                }
                

                catch (error) {
                  console.error('Error saving to database:', error);
                }
              },

        })
                
        return response.toDataStreamResponse();
    } 

    else if (feature === 'websearch'){
      const result = streamText({
        model: openai("gpt-3.5-turbo"),
        system: `
          You are an AI-powered e-commerce assistant, specialized in helping users find the best products online.
          Your role is to assist users with product searches, price comparisons, availability checks, and recommendations.
          You use structured web search results to provide accurate and up-to-date information.
      
          - Always prioritize relevance, quality, and verified product data.
          - Do not fabricate details; rely only on retrieved search results.
          - If a product isn't found, suggest alternative queries or related searches.
          - Present product details in a clear, user-friendly manner.
      
          When users ask for product recommendations, search results should include:
          - Product Name
          - Price
          - Availability (In stock / Out of stock)
          - Ratings & Reviews
          - A direct link to purchase
      
          Stay concise, helpful, and professional. Your goal is to make online shopping easier and more efficient.
          Also Write Summary of the search content
        `,
        messages,
        tools,
        maxSteps:5
      });
      
      return result.toDataStreamResponse();
    }
  }
    catch (error) {
        console.error('Error:', error);
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
  
}
