/* eslint-disable react/prop-types */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Button } from "./ui/button";

const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Search query required",
  }),
});

const SearchBar = ({ onSubmit, placeHolder, searchQuery }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { searchQuery: "" },
  });

  useEffect(() => {
    form.reset(searchQuery);
  }, [form, searchQuery]);

  const handleReset = () => {
    form.reset({
        searchQuery:''
    })
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex items-center gap-3 justify-between flex-row border-2 rounded-full p-3 ${
          form.formState.errors.searchQuery && "border-red-500"
        }`}
      >
        <Search
          strokeWidth={2.5}
          size={30}
          className="ml-1 text-orange-500 hidden md:block"
        />
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  className="border-none shadow-none text-xl focus-visible:ring-0"
                  placeholder={placeHolder}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button onClick={handleReset} type="button" variant="outline" className="rounded-full">
          Reset
        </Button>
        <Button type="submit" className="rounded-full bg-orange-500">
          Search
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;
