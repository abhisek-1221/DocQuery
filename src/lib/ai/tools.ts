import { tool } from "ai";
import { z } from "zod";
import Exa from "exa-js";

// Initialize Exa client with your API key
const exa = new Exa(process.env.NEXT_PUBLIC_EXA_API);

interface ExaSearchResult {
    id: string;
    title?: string;
    url: string;
    publishedDate: string;
    author?: string;
    text: string;
    image?: string;
    favicon?: string;
    extras?: {
      links?: string[];
      imageLinks?: string[];
    };
  }

  export const searchEcommerce = tool({
    description: "Search for e-commerce products based on a query",
    parameters: z.object({
      query: z.string().describe("Search query for e-commerce products"),
    }),
    execute: async ({ query }) => {
      try {
        // Fetch real-time data from Exa AI
        const result = await exa.searchAndContents(
          `${query}`,
          {
            text: true,
            numResults: 5,
            livecrawl: "always",
            extras: {
              links: 1,
              imageLinks: 1
            }
          }
        );
        
        // Extract the search results - note we're using result.results directly
        const searchResults = result.results.map((item) => {
          return {
            id: item?.id,
            title: item.title ?? "No Title",
            url: item?.url,
            publishedDate: item?.publishedDate,
            text: item?.text,
            extras: item?.extras || { links: [], imageLinks: [] }
          };
        });
  
        return {
          query,
          results: searchResults.length > 0 ? searchResults : [],
        };
      } catch (error) {
        console.error("Error fetching data from Exa AI:", error);
        
        // Return an empty result set in case of error
        return {
          query,
          results: [],
          error: "Failed to fetch product data"
        };
      }
    },
  });

export const tools = {
  searchEcommerce,
};
