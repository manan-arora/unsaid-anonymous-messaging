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
import { ArrowLeft, Loader2, Lock, MessageSquareMore } from "lucide-react";
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
    <div className="flex min-h-screen items-center py-10 sm:py-14">
      <div className="page-shell">
        <div className="panel-glass overflow-hidden">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="border-b border-white/8 bg-white/[0.03] px-6 py-8 sm:px-8 sm:py-10 lg:border-b-0 lg:border-r">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-white"
              >
                <ArrowLeft className="size-4" />
                Back to home
              </Link>

              <div className="mt-12 max-w-sm">
                <div className="mb-5 flex size-12 items-center justify-center rounded-2xl border border-violet-400/25 bg-violet-500/10 text-violet-200 shadow-[0_0_30px_rgba(124,58,237,0.22)]">
                  <MessageSquareMore className="size-5" />
                </div>
                <h1 className="section-title text-4xl">Welcome back to Unsaid</h1>
                <p className="section-copy mt-4">
                  Pick up the conversations that matter without turning your inbox into a performance space.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="panel-muted p-4">
                    <div className="flex items-start gap-3">
                      <Lock className="mt-0.5 size-4 text-violet-300" />
                      <div>
                        <p className="text-sm font-medium text-white">Quiet by default</p>
                        <p className="mt-1 text-sm text-white/55">A restrained interface that keeps focus on the message itself.</p>
                      </div>
                    </div>
                  </div>
                  <div className="panel-muted p-4">
                    <p className="text-sm font-medium text-white">Your anonymous inbox is one link away.</p>
                    <p className="mt-1 text-sm text-white/55">Sign in to manage incoming messages, sharing, and inbox flow.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
              <div className="mx-auto w-full max-w-md">
                <div className="mb-8">
                  <p className="text-sm uppercase tracking-[0.2em] text-white/35">
                    Sign in
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                    Continue your conversations
                  </h2>
                  <p className="mt-3 text-sm text-white/55">
                    Use your email or username to access the dashboard.
                  </p>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <Controller
                    name="identifier"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="text-white/70">Email or Username</FieldLabel>
                        <Input
                          placeholder="email or username"
                          className="h-11 rounded-xl border-white/10 bg-white/5 px-4 text-white placeholder:text-white/30 focus-visible:border-violet-400/50 focus-visible:ring-violet-400/20"
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
                        <FieldLabel className="text-white/70">Password</FieldLabel>
                        <Input
                          type="password"
                          placeholder="password"
                          className="h-11 rounded-xl border-white/10 bg-white/5 px-4 text-white placeholder:text-white/30 focus-visible:border-violet-400/50 focus-visible:ring-violet-400/20"
                          {...field}
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Button className="h-11 w-full text-sm" type="submit" disabled={isSubmitting}>
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

                <div className="mt-6 text-sm text-white/55">
                  Not a member yet?{" "}
                  <Link href="/sign-up" className="font-medium text-violet-300 transition hover:text-violet-200">
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
