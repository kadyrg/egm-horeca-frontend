"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/client/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/client/ui/form";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { AuthFormInput } from "./auth-form-input";
import { CheckCircle, CircleAlert } from "lucide-react";

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

function LoginForm({
  emailPlaceholder,
  passwordPlaceholder,
  signinButton,
}: {
  emailPlaceholder: string;
  passwordPlaceholder: string;
  signinButton: string;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        toast(
          <div className="flex items-center gap-3 text-green-700 text-red-600">
            <CircleAlert size={20} />
            Something went wrong, please try again
          </div>,
          { position: "top-center" },
        );
        return;
      }
      router.push("/");
    } catch {
      toast("Event has been created.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AuthFormInput
                  placeholder={emailPlaceholder}
                  disabled={form.formState.isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AuthFormInput
                  placeholder={passwordPlaceholder}
                  type="password"
                  disabled={form.formState.isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full h-[42px]"
          disabled={form.formState.isSubmitting}
        >
          {signinButton}
        </Button>
      </form>
    </Form>
  );
}

export { LoginForm };
