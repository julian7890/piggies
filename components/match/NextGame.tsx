import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NextGame() {
  return (
    <div className="flex flex-col text-xl md:text-2xl p-4 min-w-max">
      <div className="flex justify-center bg-[#39737C]">Next Game</div>

      <div className="border-b-2 border-white/70 py-3">
        <div className="flex justify-center gap-6 text-2xl md:text-3xl">
          <div>7/21</div>
          <div className="text-red-400">Sun</div>
        </div>
        <div className="flex justify-center">Central Park Field #3</div>
      </div>

      <div className="p-2">
        <div className="flex justify-center gap-2">
          <div>8am</div>
          <div>(7am meetup)</div>
        </div>
        <div className="flex justify-center">vs. KIZ</div>
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
