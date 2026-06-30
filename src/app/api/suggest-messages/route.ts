import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const prompt = `Generate exactly 3 short anonymous message suggestions for a social anonymous messaging platform.

Return the output as a SINGLE string, with each message separated by "||".

IMPORTANT:
The 3 suggestions should be a mix of the following styles (not all questions):

* Open-ended friendly questions
* Genuine compliments
* Fun / playful notes
* Light-hearted conversation starters
* Thoughtful observations

Tone requirements:

* warm
* friendly
* slightly witty
* youthful and conversational
* natural, like something a real person would send anonymously

Avoid:

* overly formal wording
* robotic AI phrasing
* personal/sensitive topics
* creepy, romantic, or inappropriate messages
* generic boring prompts

Good examples of style:

* What’s something you’re proud of lately?
* You have a really calming vibe, has anyone told you that?
* Okay be honest — what’s your most controversial food opinion?
* You seem like someone people trust easily.
* I feel like you’d either be really fun or really chaotic in a group trip.

Output format example:
What’s something you’re proud of lately?||You have a really calming vibe, has anyone told you that?||Okay be honest — what’s your most controversial food opinion?
`;

    const result = streamText({
      model: google("gemini-2.5-flash"),
      prompt,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("AI route error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate response",
      },
      { status: 500 },
    );
  }
}
