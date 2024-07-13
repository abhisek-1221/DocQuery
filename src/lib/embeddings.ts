import { OpenAIApi, Configuration } from 'openai-edge';
import  {RateLimiter}  from './ratelimit';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

const rateLimiter = new RateLimiter(3, 60000); 

export async function getEmbeddings(text: string) {
  return new Promise<number[]>((resolve, reject) => {
    rateLimiter.limit(async () => {
      try {
        const response = await openai.createEmbedding({
          model: "text-embedding-ada-002",
          input: text.replace(/\n/g, " "),
        });

        if (response.status !== 200) {
          const errorResponse = await response.json();
          console.error("OpenAI API error response:", errorResponse);
          throw new Error(`API Error: ${errorResponse.error.message}`);
        }

        const result = await response.json();
        console.log("OpenAI API response:", result);

        if (!result.data || !Array.isArray(result.data) || result.data.length === 0) {
          throw new Error("Unexpected response format from OpenAI API");
        }

        resolve(result.data[0].embedding as number[]);
      } catch (error:any) {
        console.error("Error calling OpenAI embeddings API", error);
        reject(error);
      }
    });
  });
}
