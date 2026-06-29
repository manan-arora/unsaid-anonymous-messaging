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
import { Ellipsis, Heart, MessageCircleHeart, Smile, X } from "lucide-react"
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
    wrapper: "bg-[#c4a1ff]",
    icon: <Heart className="size-4 fill-current" />,
  },
  {
    wrapper: "bg-[#eefb95]",
    icon: <Smile className="size-4" />,
  },
  {
    wrapper: "bg-[#ffdf93]",
    icon: <MessageCircleHeart className="size-4" />,
  },
]

export function MessageCard({ message, onMessageDelete }: MessageCardProps) {
  const createdAt = new Date(message.createdAt).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })

  const accent = iconSets[message.content.length % iconSets.length]

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
    <Card size="sm" className="neo-card mx-auto w-full max-w-none bg-white">
      <CardHeader className="gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className={`flex size-12 shrink-0 items-center justify-center rounded-[1rem] border-[2.5px] border-[#26222c] text-[#201a28] shadow-[0_4px_0_0_rgba(38,34,44,0.12)] ${accent.wrapper}`}>
              {accent.icon}
            </span>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8a8099]">
                Anonymous message
              </p>
              <CardTitle className="max-w-2xl text-base leading-7 text-[#201a28] sm:text-lg">
                {message.content}
              </CardTitle>
              <CardDescription className="text-xs font-medium text-[#6f667e]">
                {createdAt}
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden text-[#201a28] md:block">
              <Ellipsis className="size-5" />
            </span>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="neo-button-secondary size-10 border-[#26222c] bg-[#ffe0df] text-[#201a28] hover:bg-[#ffd1cf]"
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
