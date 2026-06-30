"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Ghost, Loader2, Sparkles } from "lucide-react";
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        identifier: data.identifier,
        password: data.password,
      });

      if (result?.error) {
        toast.error("Login Failed", {
          description: "Incorrect username or password",
        });
      }

      if (result?.url) {
        router.replace("/dashboard");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center py-8 sm:py-12">
      <div className="page-shell">
        <div className="neo-panel overflow-hidden">
          <div className="grid lg:grid-cols-[0.88fr_1.12fr]">
            <div className="hidden border-b-[2.5px] border-[#26222c] bg-[#b687ff] px-6 py-8 sm:px-8 sm:py-10 lg:block lg:border-b-0 lg:border-r">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#201a28] transition hover:translate-x-0.5"
              >
                <ArrowLeft className="size-4" />
                Back to home
              </Link>

              <div className="mt-10 max-w-sm">
                <div className="flex items-center gap-3">
                  <span className="ghost-mark bg-white">
                    <Ghost className="size-5" />
                  </span>
                  <p className="text-3xl font-black tracking-[-0.06em] lowercase text-[#201a28]">
                    unsaid
                  </p>
                </div>

                <h1 className="mt-10 text-5xl font-black leading-[0.95] tracking-[-0.08em] text-[#201a28] sm:text-6xl">
                  welcome
                  <br />
                  back!
                </h1>
                <p className="mt-5 text-lg leading-8 text-[#332d3f]">
                  Access your inbox and manage anonymous messages in a space that still feels fun to use.
                </p>

                <div className="mt-10 flex items-end justify-between gap-6">
                  <div className="soft-note rounded-[1.6rem] border-[#26222c] bg-[#eefb95] px-4 py-3 shadow-[0_6px_0_0_rgba(38,34,44,0.14)]">
                    <p className="text-sm font-semibold text-[#201a28]">Your voice. Your vibe.</p>
                    <p className="text-sm font-semibold text-[#201a28]">Your inbox.</p>
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
                <p className="section-kicker">sign in</p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-[#201a28] sm:text-4xl">
                  Continue your conversations
                </h2>
                <p className="mt-4 text-base leading-7 text-[#5f566e]">
                  Use your email or username to continue.
                </p>

                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
                  <Controller
                    name="identifier"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="text-sm font-semibold text-[#201a28]">Email or Username</FieldLabel>
                        <Input
                          placeholder="you@example.com"
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
                      "Sign in"
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-sm font-medium text-[#5f566e]">
                  Not a member yet?{" "}
                  <Link href="/sign-up" className="font-bold text-[#8f63ef] transition hover:text-[#7046d9]">
                    Sign up
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

export default SignIn;
