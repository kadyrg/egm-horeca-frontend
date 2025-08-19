"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/client/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/client/ui/form";
import { Slider } from "../ui/slider";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setFilterWindowState } from "@/store/filter-window-slice";
import { PriceToggleGroup } from "./price-toggle-group";
import { CircleX } from "lucide-react";

const formSchema = z.object({
  priceRange: z
    .tuple([z.number(), z.number()])
    .refine(([min, max]) => min <= max, {
      message: "Min must be less than or equal to max",
    }),
  sort: z.enum(["price_asc", "price_desc", ""]),
});

function FilterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const minMaxPrice = useSelector(
    (state: RootState) => state.minMaxPrice.minmax,
  );

  const minRange = searchParams.get("min");
  const maxRange = searchParams.get("max");

  const sort = searchParams.get("sort");
  let sortValue: "price_asc" | "price_desc" | "" = "";
  if (sort === "price_asc" || sort === "price_desc") {
    sortValue = sort;
  }

  const defMinRange = Boolean(Number(minRange))
    ? Number(minRange)
    : minMaxPrice[0];
  const defMaxRange = Boolean(Number(maxRange))
    ? Number(maxRange)
    : minMaxPrice[1];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      priceRange: [defMinRange, defMaxRange],
      sort: sortValue,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const [min, max] = values.priceRange;

    const params = new URLSearchParams(searchParams.toString());

    values.sort !== ""
      ? params.set("sort", values.sort)
      : params.delete("sort");

    params.set("min", min.toString());
    params.set("max", max.toString());

    dispatch(setFilterWindowState(false));

    router.push(`?${params.toString()}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="priceRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="py-3">Price range</FormLabel>
              <FormControl>
                <div className="space-y-3">
                  <Slider
                    min={minMaxPrice[0]}
                    max={minMaxPrice[1]}
                    step={5}
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                  <div className="flex items-center gap-3">
                    <Input
                      step={5}
                      type="number"
                      value={field.value[0]}
                      onChange={(e) =>
                        field.onChange([e.target.value, field.value[1]])
                      }
                    />
                    <div className="bg-foreground h-[2px] w-4" />
                    <Input
                      step={5}
                      type="number"
                      value={field.value[1]}
                      onChange={(e) =>
                        field.onChange([field.value[0], e.target.value])
                      }
                    />
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sort"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="justify-between py-1">
                Sort by
                <Button
                  size={"sm"}
                  type="button"
                  variant={"destructive"}
                  disabled={field.value === ""}
                  onClick={() => field.onChange("")}
                >
                  <CircleX />
                  Clear
                </Button>
              </FormLabel>
              <FormControl>
                <PriceToggleGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  type="single"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          FILTER
        </Button>
      </form>
    </Form>
  );
}

export { FilterForm };
