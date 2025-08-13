import { GENERATE_SCRIPT_PROMPT } from "@/services/Prompt";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Request body:", body);

    const { topic, language = "English" } = body;

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    // API key kontrolü
    if (!process.env.OPENROUTER_API_KEY) {
      console.error("OPENROUTER_API_KEY is missing");
      return NextResponse.json(
        { error: "API key is not configured" },
        { status: 500 }
      );
    }

    const PROMPT = GENERATE_SCRIPT_PROMPT.replace("{topic}", topic).replace(
      "{language}",
      language
    );

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1:free",
      messages: [
        {
          role: "user",
          content: PROMPT,
        },
      ],
    });

    const content = completion.choices[0].message.content;

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Generate script error:", error);
    return NextResponse.json(
      { error: "Failed to generate script" },
      { status: 500 }
    );
  }
}
