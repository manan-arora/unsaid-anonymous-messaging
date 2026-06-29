"use client";

import { MessageCard } from "@/components/MessageCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Message } from "@/model/User";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Copy, Loader2, RefreshCcw } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const handleDeleteMessage = (messageId: string) => {
    setMessages(
      messages.filter((message) => message._id.toString() !== messageId),
    );
  };

  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { register, watch, setValue } = form;

  const acceptMessage = watch("acceptMessages");

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>("api/accept-messages");
      setValue("acceptMessages", response.data.isAcceptingMessage ?? false);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error("Error", {
        description:
          axiosError.response?.data.message ||
          "Failed to fetch message settings",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(false);
      try {
        const response = await axios.get<ApiResponse>("/api/get-messages");
        setMessages(response.data.messages || []);
        if (refresh) {
          toast("Refreshed Messages", {
            description: "Showing latest messages",
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast.error("Error", {
          description:
            axiosError.response?.data.message || "Failed to fetch messages",
        });
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (!session || !session.user) return;
    fetchMessages();
    fetchAcceptMessage();
  }, [session, fetchAcceptMessage, fetchMessages]);

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessage,
      });
      setValue("acceptMessages", !acceptMessage);
      toast(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error("Error", {
        description:
          axiosError.response?.data.message || "Failed to fetch messages",
      });
    }
  };

  const username = session?.user?.username ?? "";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success("URL copied to clipboard!");
  };

  if (!session || !session.user) {
    return <div>Please Login</div>;
  }

  return (
    <div className="page-shell my-8 sm:my-10">
      <div className="panel-glass overflow-hidden p-6 sm:p-8">
        <div className="flex flex-col gap-4 border-b border-white/8 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-white/35">Dashboard</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Welcome back, {session.user.username || session.user.email}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55 sm:text-base">
              Share your link, decide when you want to receive messages, and keep your inbox focused.
            </p>
          </div>

          <Button
            variant="outline"
            className="border-white/12 bg-white/5 text-white hover:bg-white/10"
            onClick={(e) => {
              e.preventDefault();
              fetchMessages(true);
            }}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCcw className="h-4 w-4" />
            )}
            Refresh inbox
          </Button>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(260px,0.7fr)]">
          <section className="panel-muted p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">Your public link</h2>
                <p className="mt-2 text-sm text-white/55">
                  Share it anywhere people should be able to send you anonymous thoughts.
                </p>
              </div>
              <Button onClick={copyToClipboard} className="sm:min-w-[132px]">
                <Copy className="size-4" />
                Copy link
              </Button>
            </div>

            <div className="mt-5">
              <Input
                type="text"
                value={profileUrl}
                readOnly
                className="h-12 rounded-2xl border-white/10 bg-black/20 px-4 text-white placeholder:text-white/30"
              />
            </div>
          </section>

          <section className="panel-muted flex flex-col justify-between p-5 sm:p-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Inbox controls</h2>
              <p className="mt-2 text-sm text-white/55">
                Pause incoming messages anytime without affecting your existing inbox.
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-black/20 p-4">
              <div>
                <p className="text-sm font-medium text-white">Accept messages</p>
                <p className="mt-1 text-sm text-white/45">
                  {acceptMessage ? "Incoming messages are enabled." : "Incoming messages are paused."}
                </p>
              </div>
              <Switch
                {...register("acceptMessages")}
                checked={acceptMessage}
                onCheckedChange={handleSwitchChange}
                disabled={isSwitchLoading}
              />
            </div>
          </section>
        </div>

        <Separator className="my-6 bg-white/8" />

        <div className="mb-4">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Recent messages</h2>
          <p className="mt-2 text-sm text-white/50">
            {messages.length > 0
              ? `${messages.length} message${messages.length === 1 ? "" : "s"} in your inbox.`
              : "Your inbox is empty right now."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {messages.length > 0 ? (
            messages.map((message) => (
              <MessageCard
                key={message._id.toString()}
                message={message}
                onMessageDelete={handleDeleteMessage}
              />
            ))
          ) : (
            <div className="panel-muted px-5 py-10 text-center text-sm text-white/48">
              No messages to display yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
