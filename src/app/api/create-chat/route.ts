import { NextResponse } from "next/server";

// This is an API route. The code in this file will be executed when you make a POST request to /api/create-chat
export async function POST(req: Request, res: Response) {
    try {
        const body = await req.json();
        const { file_key, file_name } = body;
        console.log(file_key, file_name);
        return NextResponse.json({ message: "Chat created successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}