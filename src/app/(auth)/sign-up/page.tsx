"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useDebounceCallback } from "usehooks-ts";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Controller } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Ghost, Loader2, Sparkles } from "lucide-react";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debounced = useDebounceCallback(setUsername, 500);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage("");

        try {
          const response = await axios.get(
            `/api/check-username-unique?username=${username}`,
          );
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error checking username",
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };

    checkUsernameUnique();
  }, [username]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/sign-up", data);

      toast.success("Success", {
        description: response.data.message,
      });

      router.replace(`/verify/${username}`);
    } catch (error) {
      console.error("Error in signup of user", error);

      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data.message;

      toast.error("Signup failed", {
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const usernameTone =
    usernameMessage === "Username is unique"
      ? "text-[#5f7b00]"
      : "text-[#c2584e]";

  return (
    <div className="flex min-h-screen items-center py-8 sm:py-12">
      <div className="page-shell">
        <div className="neo-panel overflow-hidden">
          <div className="grid lg:grid-cols-[0.88fr_1.12fr]">
            <div className="hidden border-b-[2.5px] border-[#26222c] bg-[#eefb95] px-6 py-8 sm:px-8 sm:py-10 lg:block lg:border-b-0 lg:border-r">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#201a28] transition hover:translate-x-0.5"
              >
                <ArrowLeft className="size-4" />
                Back to home
              </Link>

              <div className="mt-10 max-w-sm">
                <div className="flex items-center gap-3">
                  <span className="ghost-mark bg-[#b687ff]">
                    <Ghost className="size-5" />
                  </span>
                  <p className="text-3xl font-black tracking-[-0.06em] lowercase text-[#201a28]">
                    unsaid
                  </p>
                </div>

                <h1 className="mt-10 text-5xl font-black leading-[0.95] tracking-[-0.08em] text-[#201a28] sm:text-6xl">
                  start your
                  <br />
                  link story
                </h1>
                <p className="mt-5 text-lg leading-8 text-[#3d3649]">
                  Create your account, claim your space, and let people send messages that feel honest.
                </p>

                <div className="mt-10 flex items-end justify-between gap-6">
                  <div className="neo-card rotate-[-3deg] bg-white px-4 py-3">
                    <p className="text-sm font-semibold text-[#201a28]">Playful branding.</p>
                    <p className="text-sm font-semibold text-[#201a28]">Quietly expressive.</p>
                  </div>
                  <Sparkles className="size-8 text-[#201a28]" />
                </div>
              </div>
            </div>

            <div className="bg-[#fffdf8] px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-10">
              <div className="mx-auto w-full max-w-md">
                <Link
                  href="/"
                  className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[#201a28] transition hover:translate-x-0.5 lg:hidden"
                >
                  <ArrowLeft className="size-4" />
                  Back to home
                </Link>
                <p className="section-kicker">sign up</p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-[#201a28] sm:text-4xl">
                  Create your Unsaid account
                </h2>
                <p className="mt-4 text-base leading-7 text-[#5f566e]">
                  Reserve a username and start collecting anonymous messages your way.
                </p>

                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
                  <Controller
                    name="username"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="text-sm font-semibold text-[#201a28]">Username</FieldLabel>
                        <Input
                          placeholder="username"
                          className="neo-input"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            debounced(e.target.value);
                          }}
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}

                        <div className="flex min-h-6 items-center gap-2">
                          {isCheckingUsername && <Loader2 className="size-4 animate-spin text-[#8f63ef]" />}
                          {usernameMessage && (
                            <p className={`text-sm font-medium ${usernameTone}`}>
                              {usernameMessage}
                            </p>
                          )}
                        </div>
                      </Field>
                    )}
                  />

                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="text-sm font-semibold text-[#201a28]">Email</FieldLabel>
                        <Input
                          placeholder="email"
                          className="neo-input"
                          {...field}
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="text-sm font-semibold text-[#201a28]">Password</FieldLabel>
                        <Input
                          type="password"
                          placeholder="password"
                          className="neo-input"
                          {...field}
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Button className="neo-button h-11 w-full border-[#26222c] text-sm font-bold text-[#201a28] hover:bg-[#a977ff] sm:h-12 sm:text-base" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </>
                    ) : (
                      "Sign up"
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-sm font-medium text-[#5f566e]">
                  Already a member?{" "}
                  <Link href="/sign-in" className="font-bold text-[#8f63ef] transition hover:text-[#7046d9]">
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
