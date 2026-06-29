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
    <div className="page-shell my-6 pb-10 sm:my-8 sm:pb-14">
      <div className="neo-panel overflow-hidden">
        <div className="border-b-[2.5px] border-[#26222c] px-6 py-7 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-kicker">dashboard</p>
              <h1 className="mt-3 text-4xl font-black tracking-[-0.07em] text-[#201a28] sm:text-5xl">
                hey, {session.user.username || session.user.email}
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[#5f566e]">
                Here&apos;s what&apos;s happening with your link today.
              </p>
            </div>

            <Button
              className="neo-button-secondary h-12 border-[#26222c] px-5 text-[#201a28] hover:bg-[#fff1bd]"
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
        </div>

        <div className="grid gap-4 px-6 py-6 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:px-10">
          <section className="neo-card bg-white p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8a8099]">
                  Your link
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-[-0.05em] text-[#201a28]">
                  Share your inbox
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#5f566e]">
                  One link is all it takes for people to send anonymous messages.
                </p>
              </div>
              <Button className="neo-button h-11 border-[#26222c] px-5 text-[#201a28] hover:bg-[#a977ff]" onClick={copyToClipboard}>
                <Copy className="size-4" />
                Copy link
              </Button>
            </div>

            <div className="mt-5">
              <Input
                type="text"
                value={profileUrl}
                readOnly
                className="neo-input bg-[#fffdf8] font-medium"
              />
            </div>
          </section>

          <section className="neo-card bg-[#fff3ba] p-5 sm:p-6">
            <div className="flex h-full flex-col justify-between gap-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7d6d35]">
                  Accepting messages
                </p>
                <p className="mt-3 text-4xl font-black tracking-[-0.07em] text-[#201a28]">
                  {acceptMessage ? "On" : "Off"}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#5f566e]">
                  Pause incoming messages anytime without affecting your existing inbox.
                </p>
              </div>

              <div className="flex items-center justify-between rounded-[1.4rem] border-[2.5px] border-[#26222c] bg-white px-4 py-4 shadow-[0_5px_0_0_rgba(38,34,44,0.14)]">
                <div>
                  <p className="text-sm font-semibold text-[#201a28]">Inbox toggle</p>
                  <p className="text-sm text-[#6f667e]">
                    {acceptMessage ? "Receiving messages" : "Messages paused"}
                  </p>
                </div>
                <Switch
                  {...register("acceptMessages")}
                  checked={acceptMessage}
                  onCheckedChange={handleSwitchChange}
                  disabled={isSwitchLoading}
                />
              </div>
            </div>
          </section>
        </div>

        <Separator className="bg-[#26222c]" />

        <div className="px-6 py-6 sm:px-8 lg:px-10">
          <div className="mb-5">
            <h2 className="text-3xl font-black tracking-[-0.06em] text-[#201a28]">
              Recent messages
            </h2>
            <p className="mt-2 text-sm font-medium text-[#6f667e]">
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
              <div className="neo-card bg-[#eefb95] px-5 py-10 text-center text-sm font-medium text-[#4d4659]">
                No messages to display yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
