// app/api/chat-with-docs/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
});

export async function POST(req: NextRequest) {
  const { message, fullText } = await req.json();

  if (!message) {
    return NextResponse.json({ error: 'No message provided.' }, { status: 400 });
  }

  try {
    let prompt = '';

    // Special prompt if the user just uploaded the document
    if (message === 'I have uploaded a document.' && fullText) {
      prompt = `Please provide a short 2-3 line summary of the following document, and then ask what the user wants to know about it:\n\n${fullText}`;
    } else if (fullText) {
      prompt = `The user uploaded the following document:\n\n${fullText}\n\nNow answer this question:\n\n${message}`;
    } else {
      prompt = message;
    }

    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    return NextResponse.json({
      reply:
        result.text?.trim() ||
        'I’ve reviewed the document. What would you like to know about it?',
    });
  } catch (err) {
    console.error('Gemini error:', err);
    return NextResponse.json({ error: 'Failed to get response from Gemini.' }, { status: 500 });
  }
}
