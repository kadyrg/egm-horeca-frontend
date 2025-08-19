"use client";

import { DialogDrawer } from "@/components/admin/shared/dialog-drawer";
import { EditButton } from "@/components/admin/shared/edit-button";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import {
  FormLabel,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { BadToast, GoodToast } from "./toasts";
import { ProductVariantTypesListView } from "@/lib/types/product-variant-types";
import { editProductVariantType } from "@/app/actions/product-variant-types";

const formSchema = z.object({
  nameEn: z.string().min(1).max(50),
  nameRo: z.string().min(1).max(50),
});

function ProductVariantTypeEdit({
  productVariantType,
}: {
  productVariantType: ProductVariantTypesListView;
}) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameEn: productVariantType.nameEn,
      nameRo: productVariantType.nameRo,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const body = JSON.stringify(values);
    try {
      await editProductVariantType(productVariantType.id, body);
      toast(<GoodToast text={"Category added successfully"} />, {
        position: "top-center",
      });
      setOpen(false);
    } catch {
      toast(<BadToast text={"Category couldn't be added"} />, {
        position: "top-center",
      });
    }
  }

  return (
    <DialogDrawer
      isOpen={open}
      onOpenChange={(open) => setOpen(open)}
      trigger={<EditButton />}
      title={"Edit category"}
      body={
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 min-h-0"
          >
            <ScrollArea className="h-full">
              <div className="space-y-5 p-5">
                <FormField
                  control={form.control}
                  name="nameEn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>English name</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel>Romanian name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-1 justify-end">
                  <Button size={"sm"} variant={"destructive"}>
                    Cancel
                  </Button>
                  <Button size={"sm"} type="submit">
                    Save changes
                  </Button>
                </div>
              </div>
            </ScrollArea>
          </form>
        </Form>
      }
    />
  );
}

export { ProductVariantTypeEdit };
