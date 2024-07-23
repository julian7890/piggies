"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export default function SubmitPage() {
  const form = useForm();
  const [date, setDate] = useState<Date>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  function onSubmit(values: any) {
    console.log(values);
  }

  const resultSelection = [
    "1B",
    "2B",
    "3B",
    "HR",
    "BB",
    "HBP",
    "K",
    "GO",
    "FO",
  ];

  const resultRadio = (valueInput: any, field: any) => {
    const onBase = ["1B", "2B", "3B", "HR", "BB", "HBP"];
    const outs = ["K", "GO", "FO"];
    return (
      <Button
        key={field.name + valueInput}
        value={valueInput}
        className={`md:text-xl ${
          onBase.includes(field.value) &&
          field.value == valueInput &&
          "bg-green-500 hover:bg-green-500"
        } ${
          outs.includes(field.value) &&
          field.value == valueInput &&
          "bg-red-500 hover:bg-red-500"
        }`}
        onClick={(e) => {
          e.preventDefault();
          field.onChange(e);
          if (field.value == valueInput) {
            field.onChange("");
          }
        }}
      >
        {valueInput}
      </Button>
    );
  };

  return (
    <div className="flex justify-center p-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="player"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="md:text-2xl">Player</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="bg-primary text-primary-foreground hover:bg-primary/90 border-none">
                      <SelectTrigger
                        className={`md:text-xl ${
                          !field.value && "text-muted-foreground"
                        }`}
                      >
                        <SelectValue placeholder="Select Player" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Julian">Julian</SelectItem>
                      <SelectItem value="test">test</SelectItem>
                      <SelectItem value="test2">test2</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="md:text-2xl">Game Date</FormLabel>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"default"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal md:text-xl",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Date for Submission</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      className="text-black"
                      mode="single"
                      selected={field.value}
                      onSelect={(e) => {
                        field.onChange(e);
                        setIsCalendarOpen(false);
                      }}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="1st"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <div className="md:text-2xl">1st at Bat</div>
                <FormControl>
                  <div className="flex justify-center md:justify-around gap-1 md:gap-2 flex-wrap md:w-full">
                    {resultSelection.map((result) =>
                      resultRadio(result, field)
                    )}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="2nd"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <div className="md:text-2xl">2nd at Bat</div>
                <FormControl>
                  <div className="flex justify-center md:justify-around gap-1 md:gap-2 flex-wrap md:w-full">
                    {resultSelection.map((result) =>
                      resultRadio(result, field)
                    )}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="3rd"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <div className="md:text-2xl">3rd at Bat</div>
                <FormControl>
                  <div className="flex justify-center md:justify-around gap-1 md:gap-2 flex-wrap md:w-full">
                    {resultSelection.map((result) =>
                      resultRadio(result, field)
                    )}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="4th"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <div className="md:text-2xl">4th at Bat</div>
                <FormControl>
                  <div className="flex justify-center md:justify-around gap-1 md:gap-2 flex-wrap md:w-full">
                    {resultSelection.map((result) =>
                      resultRadio(result, field)
                    )}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="5th"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <div className="md:text-2xl">5th at Bat</div>
                <FormControl>
                  <div className="flex justify-center md:justify-around gap-1 md:gap-2 flex-wrap md:w-full">
                    {resultSelection.map((result) =>
                      resultRadio(result, field)
                    )}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="p-8 mt-10 bg-[#51B8B6]/70 hover:bg-[#51B8B6]"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>

    // <form
    //   onSubmit={handleSubmit(onSubmit)}
    //   className="flex flex-col justify-center items-center p-4 md:text-2xl"
    // >
    //   <div className="p-4">Season 2024</div>
    //   <div className="flex flex-col gap-4 w-1/2">
    //     <div className="flex flex-col gap-2">
    //       <label htmlFor="player">Player</label>
    //       <select id="player" {...register("player")} className="text-black">
    //         <option value="Julian">Julian</option>
    //         <option value="Test">Test</option>
    //       </select>
    //     </div>
    //     <div className="flex flex-col gap-2">
    //       <label htmlFor="date">Game Date</label>
    //       <select id="date" {...register("date")} className="text-black">
    //         <option value="0721">7/21</option>
    //       </select>
    //     </div>
    //     <div>
    //       <label htmlFor="1st">1st at Bat</label>
    //     </div>
    //   </div>
    // </form>
  );
}
