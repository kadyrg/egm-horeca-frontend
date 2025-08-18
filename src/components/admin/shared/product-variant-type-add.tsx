"use client"

import { DialogDrawer } from "@/components/admin/shared/dialog-drawer";
import { Button } from "../../ui/button";
import { useState } from "react";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/client/ui/form";
import { toast } from "sonner";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import {
  BadToast,
  GoodToast
} from "./toasts";
import { addProductVariantType } from "@/app/actions/product-variant-types";

const formSchema = z.object({
  nameEn: z.string().min(1).max(50),
  nameRo: z.string().min(1).max(50),
})

function ProductVariantTypeAdd() {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameEn: "",
      nameRo: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const body = JSON.stringify(values)
    try {
      await addProductVariantType(body);
      toast(
        <GoodToast text={"Category added successfully"} />,
        { position: "top-center" }
      );
      setOpen(false)
    } catch {
      toast(
        <BadToast text={"Category couldn't be added"} />,
        { position: "top-center" }
      );
    }
  }

  return (
    <DialogDrawer
      isOpen={open}
      title={"Add Product"}
      onOpenChange={(open) => setOpen(open)}
      trigger={<Button size={"sm"}>Add Product Variant Type</Button>}
      body={
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 min-h-0"
          >
            <ScrollArea className="h-full">
              <div className="space-y-4 p-5">
                <FormField
                  control={form.control}
                  name="nameEn"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="English name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nameRo"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Romanian name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-1 justify-end">
                  <Button
                    size={"sm"}
                    variant={"destructive"}
                  >
                    Cancel
                  </Button>
                  <Button
                    size={"sm"}
                    type="submit"
                  >
                    Add product variant type
                  </Button>
                </div>
              </div>
            </ScrollArea>
          </form>
        </Form>
      }
    />
  );
};

export { ProductVariantTypeAdd };
