import { createOpenAI } from '@ai-sdk/openai';
import { StreamingTextResponse, streamText, StreamData, Message } from 'ai';

const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    compatibility: 'strict', // strict mode, enable when using the OpenAI API
  });

export async function POST(req:Request){
    try {
        const {messages} = await req.json()
        const response = await streamText({
            model: openai('gpt-3.5-turbo'),
            messages,
        })
        console.log('streaming response', response);
        
        const data = new StreamData();
        console.log('streaming data', data);
        
        const stream = response.toAIStream({
            onCompletion(_){
                data.close();
            }
            });
            console.log('stream', stream);
        return new StreamingTextResponse(stream, {}, data);
    } catch (error) {
        console.log("error in chat/route.ts",error);
    }
}