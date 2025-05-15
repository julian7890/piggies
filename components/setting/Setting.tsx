"use client";
import { useForm } from "react-hook-form";
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
  DelayedSelect,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "@/components/ui/use-toast";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { db } from "@/drizzle/db";

const formSchema = z.object({
  player: z.string({
    required_error: "Player is required",
  }),
  date: z.date(),
  position: z.string(),
});

type Props = {
  playerList: PlayerData[];
  gameDates: string[];
};

type PlayerData = {
  number: number;
  id: string;
  name: string;
};

const defaultValues = {};

export default function SubmitForm({ playerList, gameDates }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  const [game, setGame] = useState([]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        body: JSON.stringify(values),
      });

      const response = await res.json();

      if (!res.ok) {
        toast({
          title: `Submission Failed`,
          description: (
            <pre className="mt-2 rounded-md bg-slate-950 p-4">
              <div className="text-white">
                <div>Please try again</div>
              </div>
            </pre>
          ),
        });
      } else {
        if (response.status == "error") {
          toast({
            variant: "destructive",
            title: `Submission Failed`,
            description: (
              <pre className="mt-2 rounded-md bg-slate-950 p-4">
                <div className="text-white">
                  <div className="text-wrap">{response.message}</div>
                </div>
              </pre>
            ),
          });
          return;
        }
        setIsSubmitSuccessful(true);
        toast({
          title: `Stats for ${format(values.date, "PP")} has been submitted!`,
          description: (
            <pre className="mt-2 rounded-md bg-slate-950 p-4">
              <div className="text-white">
                <div>Submission Success!</div>
                <div>{values.player} added to order!</div>
              </div>
            </pre>
          ),
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getCurrentGame = async (date: Date | undefined) => {
    console.log(date);
    const res = await fetch("/api/game", {
      method: "POST",
      body: JSON.stringify(date),
    });

    const response = await res.json();
    console.log(response);
    setGame(response);
  };

  const playerSelection = () =>
    playerList.map((player) => {
      return (
        <SelectItem value={player.name} key={player.name}>
          {player.name}
        </SelectItem>
      );
    });

  const positionSelection = [
    "P",
    "C",
    "1st",
    "2nd",
    "3rd",
    "SS",
    "LF",
    "CF",
    "RF",
    "Sub",
  ];

  useEffect(() => {
    form.reset(defaultValues);
    setIsSubmitSuccessful(false);
  }, [isSubmitSuccessful]);

  return (
    <div className="flex justify-center p-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
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
                        getCurrentGame(e);
                      }}
                      disabled={(date) => {
                        return (
                          date < new Date("1900-01-01") ||
                          !gameDates.includes(format(date, "P"))
                        );
                      }}
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
            name="player"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="md:text-2xl">Player</FormLabel>
                <FormControl>
                  <DelayedSelect
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    name={"player"}
                    key={form.watch("player")}
                  >
                    <FormControl className="bg-primary text-primary-foreground hover:bg-primary/90 border-none">
                      <SelectTrigger
                        className={`md:text-xl ${
                          !field.value && "text-muted-foreground"
                        }`}
                      >
                        {field.value ? (
                          <SelectValue placeholder="Select Player" />
                        ) : (
                          "Select Player"
                        )}
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>{playerSelection()}</SelectContent>
                  </DelayedSelect>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="md:text-2xl">Position</FormLabel>
                <FormControl>
                  <DelayedSelect
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    name={"position"}
                    key={form.watch("position")}
                  >
                    <FormControl className="bg-primary text-primary-foreground hover:bg-primary/90 border-none">
                      <SelectTrigger
                        className={`md:text-xl ${
                          !field.value && "text-muted-foreground"
                        }`}
                      >
                        {field.value ? (
                          <SelectValue placeholder="Select Position" />
                        ) : (
                          "Select Position"
                        )}
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {positionSelection.map((position) => {
                        return (
                          <SelectItem value={position} key={position}>
                            {position}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </DelayedSelect>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="p-8 mt-10 md:text-2xl bg-[#51B8B6]/70 hover:bg-[#51B8B6]"
          >
            Submit
          </Button>
        </form>
      </Form>
      <div className="px-4">
        Batting Order
        {game.map((player: { id: string; name: string }, index) => {
          return (
            <div key={player.id} className="flex gap-2">
              <div>{index + 1}</div>
              <div>{player.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
