import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { profile, goal, background, tone } = await req.json()

    const prompt = `
You are an expert networking strategist.

STEP 1: Analyze the LinkedIn profile below.
STEP 2: Identify common ground between the person and me.
STEP 3: Generate:

1. Strong personalized hook (1 line)
2. 4-6 line cold DM
3. 2 line follow-up message

LinkedIn Profile:
${profile}

My Background:
${background}

My Goal:
${goal}

Tone:
${tone}
`

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "phi",
        prompt: prompt,
        stream: false,
      }),
    })

    const data = await response.json()

return NextResponse.json({
  success: true,
  result: data.response,
})



  } catch (error) {
    console.error("Error:", error)

    return NextResponse.json(
      { success: false, error: "Failed to generate DM" },
      { status: 500 }
    )
  }
}
