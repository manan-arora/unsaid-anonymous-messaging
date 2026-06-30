import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Ellipsis, Heart, MessageCircleHeart, Smile, Sparkles, X } from "lucide-react"
import { Message } from "@/model/User"
import axios from "axios"
import { ApiResponse } from "@/types/ApiResponse"
import { toast } from "sonner"

type MessageCardProps = {
  message: Message,
  onMessageDelete: (messageId: string) => void
}

const iconSets = [
  {
    wrapper: "bg-[#a78bfa]",
    icon: <Heart className="size-4 fill-current" />,
  },
  {
    wrapper: "bg-[#d9f99d]",
    icon: <Smile className="size-4" />,
  },
  {
    wrapper: "bg-[#fed7aa]",
    icon: <MessageCircleHeart className="size-4" />,
  },
  {
    wrapper: "bg-[#bae6fd]",
    icon: <Sparkles className="size-4" />,
  },
]

const cardBackgrounds = [
  "bg-[#faf8f3]",
  "bg-[#ede9fe]",
  "bg-[#fed7aa]/55",
  "bg-[#bae6fd]/55",
]

export function MessageCard({ message, onMessageDelete }: MessageCardProps) {
  const createdAt = new Date(message.createdAt).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })

  const accent = iconSets[message.content.length % iconSets.length]
  const cardTone = cardBackgrounds[message.content.length % cardBackgrounds.length]

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete<ApiResponse>(
        `/api/delete-message/${message._id}`
      )

      toast.success(response.data.message)
      onMessageDelete(message._id.toString())
    } catch {
      toast.error("Unable to delete message")
    }
  }

  return (
    <Card size="sm" className={`neo-card mx-auto w-full max-w-none ${cardTone}`}>
      <CardHeader className="gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3 sm:gap-4">
            <span className={`flex size-10 shrink-0 items-center justify-center rounded-[1rem] border-[2.5px] border-[#26222c] text-[#201a28] shadow-[0_4px_0_0_rgba(38,34,44,0.12)] sm:size-12 ${accent.wrapper}`}>
              {accent.icon}
            </span>
            <div className="min-w-0 space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#8b5cf6]">
                Anonymous message
              </p>
              <CardTitle className="max-w-2xl break-words text-base font-black leading-7 tracking-[-0.03em] text-[#201a28] sm:text-xl">
                {message.content}
              </CardTitle>
              <CardDescription className="text-xs font-medium text-[#6f667e]">
                {createdAt}
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 sm:self-start">
            <span className="hidden text-[#201a28] md:block">
              <Ellipsis className="size-5" />
            </span>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="neo-button-secondary size-9 border-[#26222c] bg-[#fef08a] text-[#201a28] hover:bg-[#fde047] sm:size-10"
                >
                  <X className="size-4" />
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Delete this message?
                  </AlertDialogTitle>

                  <AlertDialogDescription>
                    This action cannot be undone and will remove the message from your inbox.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteConfirm}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
