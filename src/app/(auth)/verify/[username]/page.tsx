"use client";

import { verifySchema } from "@/schemas/verifySchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Controller } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

const VerifyAccount = () => {
  const router = useRouter();
  const params = useParams();

  const form = useForm({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const response = await axios.post(`/api/verify-code`, {
        username: params.username,
        code: data.code,
      });

      toast.success("Success", {
        description: response.data.message,
      });

      router.replace("/sign-in");
    } catch (error) {
      console.error("Error in signup of user", error);

      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;

      toast.error("Verification failed", {
        description: errorMessage,
      });
    }
  };

  return (
    <div className="page-shell flex min-h-screen items-center justify-center px-4 py-8 sm:px-6">
      <div className="neo-panel w-full max-w-xl overflow-hidden">
        <div className="dashboard-tint doodle-corner border-b-[2.5px] border-[#26222c] px-6 py-7 sm:px-8">
          <p className="section-label">account verification</p>

          <h1 className="mt-3 text-3xl font-black tracking-[-0.08em] text-[#140f1c] sm:text-5xl">
            Verify your account
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-[#4f475d] sm:text-base">
            Enter the 6-digit verification code sent to your email.
          </p>
        </div>

        <div className="px-5 py-6 sm:px-8 sm:py-8">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="neo-card doodle-corner space-y-6 bg-[#ede9fe] p-5 sm:p-6"
          >
            <Controller
              name="code"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-sm font-bold uppercase tracking-wide text-[#201a28]">
                    Verification Code
                  </FieldLabel>

                  <Input
                    placeholder="123456"
                    {...field}
                    aria-invalid={fieldState.invalid}
                    className="neo-input bg-white text-center text-xl font-black tracking-[0.4em]"
                    maxLength={6}
                    inputMode="numeric"
                    onChange={(e) =>
                      field.onChange(e.target.value.replace(/\D/g, ""))
                    }
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button
              type="submit"
              className="neo-button h-12 w-full border-[#26222c] bg-[#a78bfa] text-base font-bold text-[#201a28] hover:bg-[#8b6ef7]"
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify Account"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
