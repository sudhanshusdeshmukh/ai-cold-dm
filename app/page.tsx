"use client"

import { useState } from "react"

export default function Home() {
  const [profile, setProfile] = useState("")
  const [goal, setGoal] = useState("")
  const [background, setBackground] = useState("")
  const [tone, setTone] = useState("Professional")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    setResult("")

    const res = await fetch("/api/generate-dm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        profile,
        goal,
        background,
        tone,
      }),
    })

    const data = await res.json()
    setResult(data.result)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-6">AI Cold DM Generator</h1>

      <textarea
        placeholder="Paste LinkedIn Profile"
        className="w-full max-w-xl p-3 border rounded mb-4"
        rows={4}
        value={profile}
        onChange={(e) => setProfile(e.target.value)}
      />

      <textarea
        placeholder="Your Background"
        className="w-full max-w-xl p-3 border rounded mb-4"
        rows={3}
        value={background}
        onChange={(e) => setBackground(e.target.value)}
      />

      <input
        placeholder="Your Goal"
        className="w-full max-w-xl p-3 border rounded mb-4"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />

      <select
        className="w-full max-w-xl p-3 border rounded mb-4"
        value={tone}
        onChange={(e) => setTone(e.target.value)}
      >
        <option>Professional</option>
        <option>Friendly</option>
        <option>Direct</option>
      </select>

      <button
        onClick={handleGenerate}
        className="bg-black text-white px-6 py-3 rounded"
      >
        {loading ? "Generating..." : "Generate DM"}
      </button>

      {result && (
        <div className="mt-6 w-full max-w-xl bg-white p-5 rounded shadow">
          <h2 className="font-semibold mb-2">Generated Message:</h2>
          <p className="whitespace-pre-line">{result}</p>
        </div>
      )}
    </div>
  )
}
