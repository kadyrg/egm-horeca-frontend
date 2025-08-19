"use client";

import { ArrowRight, Search as SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/client/ui/form";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  value: z.string().min(0).max(100),
});

function Search({ placeholder }: { placeholder: string }) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const query = encodeURIComponent(values.value.trim());
    if (query) {
      router.push(`/search?q=${query}`);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="relative w-full h-10">
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="w-full">
                    <label
                      htmlFor="search"
                      className="absolute left-0 h-10 w-10 flex items-center justify-center text-muted-foreground"
                    >
                      <SearchIcon size={20} />
                    </label>
                    <Input
                      id="search"
                      type="text"
                      placeholder={placeholder}
                      className="absolute pl-10 h-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant={"outline"}
            size={"icon"}
            className={cn(
              "absolute right-1 top-1 text-foreground/50 pointer-events-none w-8 h-8",
              form.watch("value") &&
                "text-foreground pointer-events-auto cursor-pointer",
            )}
          >
            <ArrowRight strokeWidth={3} />
          </Button>
        </div>
      </form>
    </Form>
  );
}

export { Search };
