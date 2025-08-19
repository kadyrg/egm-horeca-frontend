"use client";

import { DialogDrawer } from "@/components/admin/shared/dialog-drawer";
import { CategoryListViewAll } from "@/lib/types/categories";
import { Button } from "../../ui/button";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/client/ui/form";
import { addProduct } from "@/app/actions/products";
import { BadToast, GoodToast } from "../toasts";
import { toast } from "sonner";
import { ScrollArea } from "../../ui/scroll-area";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Switch } from "../../ui/switch";
import { Label } from "../../ui/label";
import { FormLabel } from "../../ui/form";
import { CategorySelect } from "./category-select";
import { ImageDropzone } from "./main-image-dropzone";

const formSchema = z.object({
  nameEn: z.string().min(1).max(50),
  nameRo: z.string().min(1).max(50),
  descriptionEn: z.string().min(1),
  descriptionRo: z.string().min(1),
  price: z.number(),
  stock: z.number(),
  categoryId: z.number(),
  status: z.boolean(),
  isTop: z.boolean(),
  mainImage: z.instanceof(File),
  extraImage1: z.instanceof(File).optional(),
  extraImage2: z.instanceof(File).optional(),
  extraImage3: z.instanceof(File).optional(),
  extraImage4: z.instanceof(File).optional(),
  extraImage5: z.instanceof(File).optional(),
  extraImage6: z.instanceof(File).optional(),
});

function ProductAdd({ categories }: { categories: CategoryListViewAll[] }) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameEn: "",
      nameRo: "",
      descriptionEn: "",
      descriptionRo: "",
      price: undefined,
      stock: undefined,
      categoryId: undefined,
      status: true,
      isTop: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append(
      "productIn",
      JSON.stringify({
        nameEn: values.nameEn,
        nameRo: values.nameRo,
        descriptionEn: values.descriptionEn,
        descriptionRo: values.descriptionRo,
        price: values.price,
        stock: values.stock,
        status: values.status,
        isTop: values.isTop,
        categoryId: values.categoryId,
      }),
    );
    if (values.mainImage) {
      formData.append("mainImage", values.mainImage);
    }
    if (values.extraImage1) {
      formData.append("extraImage1", values.extraImage1);
    }
    if (values.extraImage2) {
      formData.append("extraImage2", values.extraImage2);
    }
    if (values.extraImage3) {
      formData.append("extraImage3", values.extraImage3);
    }
    if (values.extraImage4) {
      formData.append("extraImage4", values.extraImage4);
    }
    if (values.extraImage5) {
      formData.append("extraImage5", values.extraImage5);
    }
    if (values.extraImage6) {
      formData.append("extraImage6", values.extraImage6);
    }
    try {
      await addProduct(formData);
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
      title={"Add Product"}
      onOpenChange={(open) => setOpen(open)}
      trigger={<Button size={"sm"}>Add Product</Button>}
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
                  name="descriptionEn"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="English description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="descriptionRo"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Romanian description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Price"
                          type="number"
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value ? Number(value) : undefined);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Stock"
                          type="number"
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value ? Number(value) : undefined);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CategorySelect
                          value={
                            field.value ? field.value.toString() : undefined
                          }
                          onValueChange={(val) => field.onChange(Number(val))}
                          categories={categories}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex gap-2 items-center">
                          <Switch
                            checked={field.value ?? false}
                            onCheckedChange={(val) => field.onChange(val)}
                          />
                          <Label htmlFor="status">Status</Label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isTop"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Top status</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value ?? false}
                          onCheckedChange={(val) => field.onChange(val)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2">
                  <FormField
                    control={form.control}
                    name="mainImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Main image</FormLabel>
                        <FormControl>
                          <ImageDropzone
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="extraImage1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Extra image 1</FormLabel>
                        <FormControl>
                          <ImageDropzone
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="extraImage2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Extra image 2</FormLabel>
                        <FormControl>
                          <ImageDropzone
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="extraImage3"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Extra image 3</FormLabel>
                        <FormControl>
                          <ImageDropzone
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="extraImage4"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Extra image 4</FormLabel>
                        <FormControl>
                          <ImageDropzone
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="extraImage5"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Extra image 5</FormLabel>
                        <FormControl>
                          <ImageDropzone
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="extraImage6"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Extra image 6</FormLabel>
                        <FormControl>
                          <ImageDropzone
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-1 justify-end">
                  <Button size={"sm"} variant={"destructive"}>
                    Cancel
                  </Button>
                  <Button size={"sm"} type="submit">
                    Add category
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

export { ProductAdd };
