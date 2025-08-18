"use client"

import { DialogDrawer } from "@/components/admin/shared/dialog-drawer";
import { EditButton } from "@/components/admin/shared/edit-button";
import { CategoryListView } from "@/lib/types/categories";
import { useState } from "react";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { updateCategory } from "@/app/actions/categories";
import { toast } from "sonner";
import { BadToast, GoodToast } from "./toasts";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/client/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const formSchema = z.object({
  nameEn: z.string().min(1).max(50),
  nameRo: z.string().min(1).max(50),
  image: z.instanceof(File).optional(),
})

function CategoryEdit({
  data
}: {
  data: CategoryListView
}) {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameEn: data.nameEn,
      nameRo: data.nameRo,
      image: undefined
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData()
    formData.append(
      "categoryIn",
      JSON.stringify({
        nameEn: values.nameEn,
        nameRo: values.nameRo
      })
    );
    if (values.image) {
      formData.append("image", values.image);
    }
    try {
      await updateCategory(data.id, formData);
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
      onOpenChange={(open) => setOpen(open)}
      trigger={<EditButton />}
      title={"Edit category"}
      body={
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 p-3"
          >
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
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0] ?? null;
                        field.onChange(file);
                      }}
                      onBlur={field.onBlur}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-1 justify-end">
              <Button
                type="button"
                onClick={() => setOpen(false)}
                size={"sm"}
                variant={"destructive"}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                type="submit"
              >
                Save changes
              </Button>
            </div>
          </form>
        </Form>
      }
    />
  );
};

export { CategoryEdit };
