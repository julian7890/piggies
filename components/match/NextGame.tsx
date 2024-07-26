import Link from "next/link";
import { Button } from "@/components/ui/button";
import { format, sub } from "date-fns";
import { toZonedTime } from "date-fns-tz";

type Props = {
  nextGame: {
    id: string;
    gameDate: Date | null;
    gameTime: string | null;
    field: string | null;
    opponent: string | null;
  };
};

export default function NextGame({ nextGame }: Props) {
  const nextDate = toZonedTime(nextGame.gameDate as Date, "America/New_York");
  const dayOfWeek = format(nextDate as Date, "ccc");
  const gameTime = format(nextDate as Date, "haaa");
  const meetTime = format(sub(nextDate as Date, { hours: 1 }), "haaa");
  return (
    <div className="flex flex-col text-xl md:text-2xl p-4 min-w-max">
      <div className="flex justify-center bg-[#39737C]">Next Game</div>

      <div className="border-b-2 border-white/70 py-3">
        <div className="flex justify-center gap-6 text-2xl md:text-3xl">
          <div>{format(nextDate as Date, "M'/'d")}</div>
          <div
            className={`${
              dayOfWeek == "Sun"
                ? "text-red-400"
                : dayOfWeek == "Sat"
                ? "text-blue-400"
                : ""
            }`}
          >
            {dayOfWeek}
          </div>
        </div>
        <div className="flex justify-center">{nextGame.field}</div>
      </div>

      <div className="p-2">
        <div className="flex justify-center gap-2">
          <div>{gameTime}</div>
          <div>({meetTime} meetup)</div>
        </div>
        <div className="flex justify-center">vs. {nextGame.opponent}</div>
      </div>
      <Button asChild>
        <Link
          href="https://densuke.biz/list?cd=eKfScu3eXPJP43YF"
          target="_blank"
        >
          Open Densuke
        </Link>
      </Button>
    </div>
  );
}
