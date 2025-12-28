
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const { content, language = "ru" } = await req.json();

        if (!content) {
            return NextResponse.json({ error: "Content is required" }, { status: 400 });
        }

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: `You are a professional assistant for hoteliers. Provide a brief summary and 3-5 key points from the following article. The response must be in ${language === "ru" ? "Russian" : language === "uk" ? "Ukrainian" : "English"}.
          Format the output as follows:
          SUMMARY: [One paragraph summary]
          KEY_POINTS:
          - [Point 1]
          - [Point 2]
          ...`
                },
                {
                    role: "user",
                    content: content,
                },
            ],
            temperature: 0.7,
            max_tokens: 500,
        });

        const resultText = response.choices[0].message.content || "";

        // Parse the result
        const summaryMatch = resultText.match(/SUMMARY:([\s\S]*?)KEY_POINTS:/);
        const summary = summaryMatch ? summaryMatch[1].trim() : "";

        const keyPointsMatch = resultText.match(/KEY_POINTS:([\s\S]*)/);
        const keyPoints = keyPointsMatch
            ? keyPointsMatch[1].trim().split('\n').map(p => p.replace(/^- /, "").trim()).filter(Boolean)
            : [];

        return NextResponse.json({ summary, keyPoints });
    } catch (error: any) {
        console.error("OpenAI Error:", error);
        return NextResponse.json({ error: error.message || "Failed to generate summary" }, { status: 500 });
    }
}
