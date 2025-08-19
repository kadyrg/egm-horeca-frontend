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

const formSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  phoneNumber: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

type RegisterResponse = {
  email: string;
};

function RegisterForm({
  firstNamePlaceholder,
  lastNamePlaceholder,
  emailPlaceholder,
  phoneNumberPlaceholder,
  passwordPlaceholder,
  signupButton,
}: {
  firstNamePlaceholder: string;
  lastNamePlaceholder: string;
  emailPlaceholder: string;
  phoneNumberPlaceholder: string;
  passwordPlaceholder: string;
  signupButton: string;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        },
      );

      if (!res.ok) {
        toast("Registration failed");
        return;
      }
      const data: RegisterResponse = await res.json();
      router.push("/");
      toast(`Registration success. We sent email to ${data.email}`);
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
        <div className="flex gap-3">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <AuthFormInput
                    placeholder={firstNamePlaceholder}
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
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <AuthFormInput
                    placeholder={lastNamePlaceholder}
                    disabled={form.formState.isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AuthFormInput
                  placeholder={phoneNumberPlaceholder}
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
        <p className="text-sm py-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
          consequuntur
        </p>
        <Button
          className="w-full h-[42px]"
          disabled={form.formState.isSubmitting}
        >
          {signupButton}
        </Button>
      </form>
    </Form>
  );
}

export { RegisterForm };
