"use client";

import { Button } from "@/components/client/ui/button";
import { DialogDrawer } from "./dialog-drawer";
import { useState } from "react";
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
import { addCategory } from "@/app/actions/categories";
import { toast } from "sonner";
import { BadToast, GoodToast } from "./toasts";
import { Input } from "../ui/input";

const formSchema = z.object({
  nameEn: z.string().min(1).max(50),
  nameRo: z.string().min(1).max(50),
  image: z.instanceof(File),
});

function CategoryAdd() {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameEn: "",
      nameRo: "",
      image: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append(
      "categoryIn",
      JSON.stringify({ nameEn: values.nameEn, nameRo: values.nameRo }),
    );
    formData.append("image", values.image);
    try {
      await addCategory(formData);
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
    <>
      <DialogDrawer
        title={"Add Category"}
        isOpen={open}
        onOpenChange={(open) => setOpen(open)}
        trigger={<Button size={"sm"}>Add Cateogory</Button>}
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
                      <Input placeholder="English name" {...field} />
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
                      <Input placeholder="Romanian name" {...field} />
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
                <Button size="sm" type="submit">
                  Add Category
                </Button>
              </div>
            </form>
          </Form>
        }
      />
    </>
  );
}

export { CategoryAdd };
