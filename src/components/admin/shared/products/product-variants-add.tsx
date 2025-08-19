"use client";

import { DialogDrawer } from "../dialog-drawer";
import { useState } from "react";
import { Button } from "../../ui/button";

import { BadToast, GoodToast } from "../toasts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { toast } from "sonner";
import { ScrollArea } from "../../ui/scroll-area";
import { Input } from "../../ui/input";
import { addProductVariant } from "@/app/actions/product-variants";
import { ProductVariantTypeSelect } from "../product-variant-type-select";
import { ProductVariantTypesListView } from "@/lib/types/product-variant-types";
import { FormLabel,  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage, } from "../../ui/form";
const formSchema = z.object({
  nameEn: z.string().min(1).max(50),
  nameRo: z.string().min(1).max(50),
  price: z.number(),
  stock: z.number(),
  productVariantTypeId: z.number().min(1)
});
function ProductVariantsAdd({productId, productVariantTypesAll}: {productId: number; productVariantTypesAll: ProductVariantTypesListView[]}) {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        nameEn: "",
        nameRo: "",
        price: undefined,
        stock: undefined
      },
    });
    async function onSubmit(values: z.infer<typeof formSchema>) {
    const body = JSON.stringify(
      {...values, productId}
    );
    try {
      await addProductVariant(body);
      toast(<GoodToast text={"Product variant added successfully"} />, {
        position: "top-center",
      });
      setOpen(false);
    } catch {
      toast(<BadToast text={"Product variant couldn't be added"} />, {
        position: "top-center",
      });
    }
  }
  return (
    <DialogDrawer
      title={"Add product variant"}
      isOpen={open}
      onOpenChange={(open) => setOpen(open)}
      trigger={<Button size={"sm"}>Add Product Variant</Button>}
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
                  name="productVariantTypeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel></FormLabel>
                      <FormControl>
                        <ProductVariantTypeSelect
                          value={
                            field.value ? field.value.toString() : undefined
                          }
                          onValueChange={(val) => field.onChange(Number(val))}
                          data={productVariantTypesAll}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                <div className="flex gap-1 justify-end">
                  <Button size={"sm"} variant={"destructive"}>
                    Cancel
                  </Button>
                  <Button size={"sm"} type="submit">
                    Add product variant
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

export { ProductVariantsAdd };
