import { getContext } from '@/lib/context';
import { db } from '@/lib/db';
import { createOpenAI } from '@ai-sdk/openai';
import { StreamingTextResponse, streamText, StreamData, Message } from 'ai';
import { chats, messages as _messages } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    compatibility: 'strict', // strict mode, enable when using the OpenAI API
  });

export async function POST(req:Request){
    try {
        const {messages, chatId} = await req.json()
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
          If the context does not include the answer to a question, the AI assistant will say, "I'm sorry, but I don't have the information to answer that question."
          AI assistant will not apologize for previous responses but will indicate that new data has been considered.
          AI assistant will only draw from the provided context and will not fabricate information.
          `,
      };
      

        const response = await streamText({
            model: openai('gpt-3.5-turbo'),
            messages: [
                prompt,
                ...messages.filter((message: Message) => message.role === "user"),
              ],
        })
        
        const data = new StreamData();
        
        const stream = response.toAIStream({
            onStart: async () => {
                // save user message into db
                await db.insert(_messages).values({
                  chatId,
                  content: lastMessage.content,
                  role: "user",
                });
              },
              onCompletion: async (completion) => {
                // save ai message into db
                await db.insert(_messages).values({
                  chatId,
                  content: completion,
                  role: "system",
                });
              },
              onFinal(_) {
                data.close();
              },
            });
        return new StreamingTextResponse(stream, {}, data);
    } catch (error) {
        console.log("error in chat/route.ts",error);
    }
}