"use client"

import { useMemo, useState } from "react"
import { useParams } from "next/navigation"
import axios, { AxiosError } from "axios"
import { Sparkles, Send, WandSparkles } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { ApiResponse } from "@/types/ApiResponse"

const Page = () => {
  const params = useParams<{ username: string }>()
  const username = useMemo(() => {
    const value = params?.username
    return typeof value === "string" ? decodeURIComponent(value) : ""
  }, [params])

  const [message, setMessage] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [isSuggesting, setIsSuggesting] = useState(false)
  const [suggestionStream, setSuggestionStream] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])

  const parsedUsername = username.trim()
  const canSend = parsedUsername.length > 0 && message.trim().length > 0 && !isSending

  const handleSendMessage = async () => {
    if (!parsedUsername) {
      toast.error("Missing username", {
        description: "This public page needs a valid username to receive messages.",
      })
      return
    }

    const content = message.trim()
    if (!content) {
      toast.error("Write a message first", {
        description: "Type something anonymous before sending it.",
      })
      return
    }

    setIsSending(true)
    try {
      const response = await axios.post<ApiResponse>("/api/send-message", {
        username: parsedUsername,
        content,
      })

      toast.success("Sent anonymously", {
        description: response.data.message,
      })
      setMessage("")
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error("Could not send message", {
        description:
          axiosError.response?.data.message ?? "Something went wrong while sending the message.",
      })
    } finally {
      setIsSending(false)
    }
  }

  const handleSuggestMessages = async () => {
    if (!parsedUsername) {
      toast.error("Missing username", {
        description: "Suggestions are unavailable because this page has no valid username.",
      })
      return
    }

    setIsSuggesting(true)
    setSuggestionStream("")
    setSuggestions([])

    try {
      const response = await fetch("/api/suggest-messages", {
        method: "POST",
      })

      if (!response.ok) {
        let errorMessage = "Failed to generate suggestions"

        try {
          const errorJson = (await response.json()) as Partial<ApiResponse>
          if (typeof errorJson.message === "string") {
            errorMessage = errorJson.message
          }
        } catch {
          // The route usually streams plain text, so JSON parsing can fail here.
        }

        throw new Error(errorMessage)
      }

      let finalText = ""

      if (response.body) {
        const reader = response.body.getReader()
        const decoder = new TextDecoder()

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          finalText += chunk
          setSuggestionStream(finalText)
        }

        finalText += new TextDecoder().decode()
      } else {
        finalText = await response.text()
        setSuggestionStream(finalText)
      }

      const parsedSuggestions = finalText
        .split("||")
        .map((item) => item.trim())
        .filter(Boolean)

      setSuggestions(parsedSuggestions)

      if (parsedSuggestions.length === 0) {
        toast.error("No suggestions returned", {
          description: "The AI response was empty or not in the expected format.",
        })
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while generating suggestions."

      toast.error("Suggestion request failed", {
        description: message,
      })
    } finally {
      setIsSuggesting(false)
    }
  }

  return (
    <div className="page-shell my-6 pb-10 sm:my-8 sm:pb-14">
      <div className="neo-panel overflow-hidden">
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <section className="border-b-[2.5px] border-[#26222c] bg-[#fffdf8] px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:border-b-0 lg:border-r lg:px-10 lg:py-8">
            <div className="max-w-2xl">
              <h1 className="mt-4 break-words text-3xl font-black leading-[0.95] tracking-[-0.08em] text-[#201a28] sm:text-4xl md:text-5xl lg:text-6xl">
                Send an anonymous
                <span className="block sm:inline"> message to</span>
                <span className="hero-word"> @{parsedUsername || "someone"} </span>
              </h1>

              <div className="mt-6 rounded-[1.8rem] border-[2.5px] border-[#26222c] bg-[#b687ff] p-3 shadow-[0_8px_0_0_rgba(38,34,44,0.16)] sm:mt-8 sm:p-4 md:p-5">
                <div className="rounded-[1.4rem] border-[2.5px] border-[#26222c] bg-[#fffdf8] p-4 sm:p-5">
                  <label
                    htmlFor="anonymous-message"
                    className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8a8099]"
                  >
                    Your message
                  </label>

                  <textarea
                    id="anonymous-message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Drop a kind note, a thoughtful question, or something encouraging.
                It stays anonymous, simple, and direct."
                    className="mt-3 min-h-36 w-full resize-none rounded-[1.4rem] border-[2.5px] border-[#26222c] bg-white px-4 py-4 text-base leading-7 text-[#201a28] shadow-[0_4px_0_0_rgba(38,34,44,0.1)] outline-none transition placeholder:text-[#7c7488] focus:border-[#8f63ef] focus:ring-4 focus:ring-[#d5c1ff] sm:min-h-44"
                  />

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-medium text-[#6f667e]">
                      Anonymous messages work best when they feel human.
                    </p>

                    <Button
                      onClick={handleSendMessage}
                      disabled={!canSend}
                      className="neo-button h-11 w-full border-[#26222c] px-5 text-sm font-bold text-[#201a28] hover:bg-[#a977ff] sm:h-12 sm:w-auto sm:text-base"
                    >
                      <Send className="size-4" />
                      {isSending ? "Sending..." : "Send anonymously"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside className="bg-[#eefb95] px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:py-10">
            <div className="neo-card bg-[#fffdf8] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="mt-2 break-words text-2xl font-black tracking-[-0.06em] text-[#201a28] sm:text-3xl">
                    Need ideas?
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-[#5f566e]">
                    Ask the AI for three message ideas, then tap any one to fill the message box.
                  </p>
                </div>
                <Sparkles className="size-6 shrink-0 text-[#201a28]" />
              </div>

              <Button
                onClick={handleSuggestMessages}
                disabled={isSuggesting || !parsedUsername}
                className="neo-button mt-5 h-11 w-full border-[#26222c] text-sm font-bold text-[#201a28] hover:bg-[#a977ff] sm:h-12 sm:text-base"
              >
                <WandSparkles className="size-4" />
                {isSuggesting ? "Generating..." : "Suggest messages"}
              </Button>

              <div className="mt-5 space-y-3">
                {suggestions.length > 0 ? (
                  suggestions.map((suggestion, index) => (
                    <button
                      key={`${suggestion}-${index}`}
                      type="button"
                      onClick={() => setMessage(suggestion)}
                      className="neo-card block w-full bg-white px-4 py-4 text-left hover:bg-[#fff8dc]"
                    >
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8a8099]">
                        Idea {index + 1}
                      </p>
                      <p className="mt-2 break-words text-base leading-7 text-[#201a28]">
                        {suggestion}
                      </p>
                    </button>
                  ))
                ) : (
                  <div className="rounded-[1.4rem] border-[2.5px] border-dashed border-[#26222c] bg-white px-4 py-5 text-sm leading-6 text-[#5f566e]">
                    {isSuggesting
                      ? "Generating suggestions..."
                      : "No suggestions yet. Tap the button above if you want a few message ideas."}
                  </div>
                )}
              </div>

              {suggestionStream && false}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Page
