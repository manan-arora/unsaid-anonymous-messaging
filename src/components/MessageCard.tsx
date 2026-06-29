import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
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
import { X } from "lucide-react"
import { Message } from "@/model/User"
import axios from "axios"
import { ApiResponse } from "@/types/ApiResponse"
import { toast } from "sonner"


// Props define what data/functions parent must provide to this component.
//
// message -> actual message object to display
// onMessageDelete -> callback function from parent used to update parent state
type MessageCardProps = {
  message: Message,
  onMessageDelete: (messageId: string) => void
}

export function MessageCard({ message, onMessageDelete }: MessageCardProps) {

  // Runs only when user confirms deletion in dialog
  const handleDeleteConfirm = async () => {

    // Call backend API to delete message from database
    const response = await axios.delete<ApiResponse>(
      `/api/delete-message/${message._id}`
    )

    toast.success(response.data.message)

    // Mongo _id is ObjectId, but parent callback expects string
    const messageId = message._id.toString()

    // Notify parent:
    // "Message is deleted successfully, remove it from UI too"
    //
    // IMPORTANT:
    // Child component cannot directly modify parent state.
    // So we call parent's function instead.
    onMessageDelete(messageId)
  }

  return (
    <Card size="sm" className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between">
          {message.content}
          
           {/* AlertDialog is confirmation modal before destructive action */}

           
        <AlertDialog>

          {/* asChild means Button becomes trigger instead of wrapper */}
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <X className="w-5 h-5" />
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure?
              </AlertDialogTitle>

              <AlertDialogDescription>
                This action cannot be undone.
                This will permanently delete the message.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>
                Cancel
              </AlertDialogCancel>

              {/* Clicking Continue triggers actual deletion */}
              <AlertDialogAction onClick={handleDeleteConfirm}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        
          </div>
          </CardTitle>

       
      </CardHeader>
    </Card>
  )
}