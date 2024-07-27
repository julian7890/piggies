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

const formSchema = z.object({
  player: z.string({
    required_error: "Player is required",
  }),
  date: z.date(),
  ["1st"]: z.string(),
  ["2nd"]: z.string(),
  ["3rd"]: z.string(),
  ["4th"]: z.string(),
  ["5th"]: z.string(),
  runs: z.coerce.number(),
  RBI: z.coerce.number(),
  SB: z.coerce.number(),
  IPthird: z.coerce.number(),
  SO: z.coerce.number(),
  hitsAllowed: z.coerce.number(),
  runsAllowed: z.coerce.number(),
  earnedRunsAllowed: z.coerce.number(),
  homerunAllowed: z.coerce.number(),
  HB: z.coerce.number(),
  walksAllowed: z.coerce.number(),
  pitcherRecord: z.string(),
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

const defaultValues = {
  ["1st"]: "",
  ["2nd"]: "",
  ["3rd"]: "",
  ["4th"]: "",
  ["5th"]: "",
  runs: 0,
  RBI: 0,
  SB: 0,
  IPthird: 0,
  SO: 0,
  hitsAllowed: 0,
  runsAllowed: 0,
  earnedRunsAllowed: 0,
  homerunAllowed: 0,
  HB: 0,
  walksAllowed: 0,
  pitcherRecord: "",
};

export default function SubmitForm({ playerList, gameDates }: Props) {
  console.log(gameDates.includes("07/21/2024"));
  console.log(gameDates);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [pitchInputOpen, setPitchInputOpen] = useState(false);

  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch("/api/stat", {
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
                <div>Thank you {values.player}!</div>
              </div>
            </pre>
          ),
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const playerSelection = () =>
    playerList.map((player) => {
      return (
        <SelectItem value={player.name} key={player.name}>
          {player.name}
        </SelectItem>
      );
    });

  const resultSelection = [
    "1B",
    "2B",
    "3B",
    "HR",
    "BB",
    "HBP",
    "K",
    "GO / FO",
    "SF",
  ];

  const resultRadio = (valueInput: any, field: any) => {
    const onBase = ["1B", "2B", "3B", "HR", "BB", "HBP"];
    const outs = ["K", "GO / FO", "SF"];
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

  const pitcherResultSelection = ["win", "loss", "save"];

  const pitcherResultRadio = (valueInput: any, field: any) => {
    return (
      <Button
        key={field.name + valueInput}
        value={valueInput}
        className={`md:text-xl px-8 py-6 ${
          field.value == "win" &&
          field.value == valueInput &&
          "bg-green-500 hover:bg-green-500"
        } ${
          field.value == "loss" &&
          field.value == valueInput &&
          "bg-red-500 hover:bg-red-500"
        }
        ${
          field.value == "save" &&
          field.value == valueInput &&
          "bg-blue-500 hover:bg-blue-500"
        }
        `}
        onClick={(e) => {
          e.preventDefault();
          field.onChange(e);
          if (field.value == valueInput) {
            field.onChange("");
          }
        }}
      >
        {valueInput.charAt(0).toUpperCase() + valueInput.slice(1)}
      </Button>
    );
  };

  const genericSelection = (
    category: string,
    initIdx: number,
    endIdx: number
  ) => {
    const range = (start: number, stop: number, step: number) =>
      Array.from(
        { length: (stop - start) / step + 1 },
        (_, i) => start + i * step
      );

    return range(initIdx, endIdx, 1).map((value) => {
      return (
        <SelectItem value={`${value}`} key={category + value}>
          {value}
        </SelectItem>
      );
    });
  };

  const inningsSelection = () => {
    const range = (start: number, stop: number, step: number) =>
      Array.from(
        { length: (stop - start) / step + 1 },
        (_, i) => start + i * step
      );

    return range(1, 21, 1).map((value) => {
      const whole = Math.floor(value / 3);
      switch (value % 3) {
        case 0:
          return (
            <SelectItem key={"IP" + value} value={`${value}`}>
              {whole}
            </SelectItem>
          );
        case 1:
          return (
            <SelectItem key={"IP" + value + "1/3"} value={`${value}`}>
              <span className="flex gap-2">
                {whole ? <div>{whole}</div> : ""}
                <div>1/3</div>
              </span>
            </SelectItem>
          );
        case 2:
          return (
            <SelectItem key={"IP" + value + "2/3"} value={`${value}`}>
              <span className="flex gap-2">
                {whole ? <div>{whole}</div> : ""}
                <div>2/3</div>
              </span>
            </SelectItem>
          );
      }
    });
  };

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
            name="player"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="md:text-2xl">Player</FormLabel>
                <FormControl>
                  <Select
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
                      disabled={(date) => {
                        return (
                          date > new Date() ||
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
          <div className="flex justify-end gap-4 text-xs md:text-sm text-slate-400 pt-4">
            <div>GO / FO = Ground / Fly Out</div>
            <div>SF = Sacrifice Fly</div>
          </div>
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

          <FormField
            control={form.control}
            name="runs"
            render={({ field }) => (
              <FormItem className="px-16">
                <FormLabel className="md:text-2xl">
                  Runs (touched home)
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={"0"}
                    value={`${field.value}`}
                    name={"runs"}
                    key={form.watch("runs")}
                  >
                    <FormControl className="bg-primary text-primary-foreground hover:bg-primary/90 border-none">
                      <SelectTrigger
                        className={`md:text-xl ${
                          (!field.value || field.value == 0) &&
                          "text-muted-foreground"
                        }`}
                      >
                        <SelectValue placeholder="Runs Scored" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"0"}>0</SelectItem>
                      {genericSelection("runs", 1, 10)}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="RBI"
            render={({ field }) => (
              <FormItem className="px-16">
                <FormLabel className="md:text-2xl">RBI</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={"0"}
                    value={`${field.value}`}
                    name={"RBI"}
                    key={form.watch("RBI")}
                  >
                    <FormControl className="bg-primary text-primary-foreground hover:bg-primary/90 border-none">
                      <SelectTrigger
                        className={`md:text-xl ${
                          (!field.value || field.value == 0) &&
                          "text-muted-foreground"
                        }`}
                      >
                        <SelectValue placeholder="RBI" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"0"}>0</SelectItem>
                      {genericSelection("RBI", 1, 10)}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="SB"
            render={({ field }) => (
              <FormItem className="px-16">
                <FormLabel className="md:text-2xl">Stolen Bases</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={"0"}
                    value={`${field.value}`}
                    name={"SB"}
                    key={form.watch("SB")}
                  >
                    <FormControl className="bg-primary text-primary-foreground hover:bg-primary/90 border-none">
                      <SelectTrigger
                        className={`md:text-xl ${
                          (!field.value || field.value == 0) &&
                          "text-muted-foreground"
                        }`}
                      >
                        <SelectValue placeholder="Stolen Bases" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"0"}>0</SelectItem>
                      {genericSelection("SB", 1, 10)}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className={` hover:bg-slate-600 mt-8 md:text-2xl ${
              pitchInputOpen ? "bg-slate-400" : "bg-slate-600/60"
            }`}
            onClick={(e) => {
              e.preventDefault();
              setPitchInputOpen(!pitchInputOpen);
            }}
          >
            {pitchInputOpen ? "  - Pitching Stats" : "  + Pitching Stats"}
          </Button>

          {pitchInputOpen ? (
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="IPthird"
                render={({ field }) => (
                  <FormItem className="px-16">
                    <FormLabel className="md:text-2xl">
                      Innings Pitched
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={"0"}
                        value={`${field.value}`}
                        name={"IPthird"}
                        key={form.watch("IPthird")}
                      >
                        <FormControl className="bg-primary text-primary-foreground hover:bg-primary/90 border-none">
                          <SelectTrigger
                            className={`md:text-xl ${
                              (!field.value || field.value == 0) &&
                              "text-muted-foreground"
                            }`}
                          >
                            <SelectValue placeholder="Innings Pitched" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem key={"IP0"} value={`0`}>
                            0
                          </SelectItem>
                          {inningsSelection()}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="SO"
                render={({ field }) => (
                  <FormItem className="px-16">
                    <FormLabel className="md:text-2xl">Strike Outs</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={"0"}
                        value={`${field.value}`}
                        name={"SO"}
                        key={form.watch("SO")}
                      >
                        <FormControl className="bg-primary text-primary-foreground hover:bg-primary/90 border-none">
                          <SelectTrigger
                            className={`md:text-xl ${
                              (!field.value || field.value == 0) &&
                              "text-muted-foreground"
                            }`}
                          >
                            <SelectValue placeholder="Strike Outs" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem key={"strike0"} value={`0`}>
                            0
                          </SelectItem>
                          {genericSelection("SO", 1, 10)}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hitsAllowed"
                render={({ field }) => (
                  <FormItem className="px-16">
                    <FormLabel className="md:text-2xl">Hits Allowed</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={"0"}
                        value={`${field.value}`}
                        name={"hitsAllowed"}
                        key={form.watch("hitsAllowed")}
                      >
                        <FormControl className="bg-primary text-primary-foreground hover:bg-primary/90 border-none">
                          <SelectTrigger
                            className={`md:text-xl ${
                              (!field.value || field.value == 0) &&
                              "text-muted-foreground"
                            }`}
                          >
                            <SelectValue placeholder="Hits Allowed" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem key={"strike0"} value={`0`}>
                            0
                          </SelectItem>
                          {genericSelection("hitsAllowed", 1, 10)}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="runsAllowed"
                render={({ field }) => (
                  <FormItem className="px-16">
                    <FormLabel className="md:text-2xl">Runs Allowed</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={"0"}
                        value={`${field.value}`}
                        name={"runsAllowed"}
                        key={form.watch("runsAllowed")}
                      >
                        <FormControl className="bg-primary text-primary-foreground hover:bg-primary/90 border-none">
                          <SelectTrigger
                            className={`md:text-xl ${
                              (!field.value || field.value == 0) &&
                              "text-muted-foreground"
                            }`}
                          >
                            <SelectValue placeholder="Runs Allowed" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem key={"strike0"} value={`0`}>
                            0
                          </SelectItem>
                          {genericSelection("runsAllowed", 1, 10)}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="earnedRunsAllowed"
                render={({ field }) => (
                  <FormItem className="px-16">
                    <FormLabel className="md:text-2xl">
                      Earned Runs Allowed
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={"0"}
                        value={`${field.value}`}
                        name={"earnedRunsAllowed"}
                        key={form.watch("earnedRunsAllowed")}
                      >
                        <FormControl className="bg-primary text-primary-foreground hover:bg-primary/90 border-none">
                          <SelectTrigger
                            className={`md:text-xl ${
                              (!field.value || field.value == 0) &&
                              "text-muted-foreground"
                            }`}
                          >
                            <SelectValue placeholder="Earned Runs Allowed" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem key={"strike0"} value={`0`}>
                            0
                          </SelectItem>
                          {genericSelection("earnedRunsAllowed", 1, 10)}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="homerunAllowed"
                render={({ field }) => (
                  <FormItem className="px-16">
                    <FormLabel className="md:text-2xl">
                      Homeruns Allowed
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={"0"}
                        value={`${field.value}`}
                        name={"homerunAllowed"}
                        key={form.watch("homerunAllowed")}
                      >
                        <FormControl className="bg-primary text-primary-foreground hover:bg-primary/90 border-none">
                          <SelectTrigger
                            className={`md:text-xl ${
                              (!field.value || field.value == 0) &&
                              "text-muted-foreground"
                            }`}
                          >
                            <SelectValue placeholder="Homeruns Allowed" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem key={"homerunAllowed0"} value={`0`}>
                            0
                          </SelectItem>
                          {genericSelection("homerunAllowed", 1, 10)}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="HB"
                render={({ field }) => (
                  <FormItem className="px-16">
                    <FormLabel className="md:text-2xl">Hit Batsmen</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={"0"}
                        value={`${field.value}`}
                        name={"HB"}
                        key={form.watch("HB")}
                      >
                        <FormControl className="bg-primary text-primary-foreground hover:bg-primary/90 border-none">
                          <SelectTrigger
                            className={`md:text-xl ${
                              (!field.value || field.value == 0) &&
                              "text-muted-foreground"
                            }`}
                          >
                            <SelectValue placeholder="Hit Batsmen" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem key={"HB0"} value={`0`}>
                            0
                          </SelectItem>
                          {genericSelection("HB", 1, 10)}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="walksAllowed"
                render={({ field }) => (
                  <FormItem className="px-16">
                    <FormLabel className="md:text-2xl">Walks Allowed</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={"0"}
                        value={`${field.value}`}
                        name={"walksAllowed"}
                        key={form.watch("walksAllowed")}
                      >
                        <FormControl className="bg-primary text-primary-foreground hover:bg-primary/90 border-none">
                          <SelectTrigger
                            className={`md:text-xl ${
                              (!field.value || field.value == 0) &&
                              "text-muted-foreground"
                            }`}
                          >
                            <SelectValue placeholder="Walks Allowed" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem key={"walksAllowed0"} value={`0`}>
                            0
                          </SelectItem>
                          {genericSelection("walksAllowed", 1, 10)}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full p-2">
                <FormField
                  control={form.control}
                  name="pitcherRecord"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex justify-around">
                          {pitcherResultSelection.map((result) =>
                            pitcherResultRadio(result, field)
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ) : (
            ""
          )}

          <Button
            type="submit"
            className="p-8 mt-10 md:text-2xl bg-[#51B8B6]/70 hover:bg-[#51B8B6]"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
