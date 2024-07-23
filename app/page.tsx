import NextGame from "@/components/match/NextGame";
import Recent from "@/components/match/Recent";
import BattingStats from "@/components/stats/BattingStats";
import PitchingStats from "@/components/stats/PitchingStats";

export default function Home() {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center md:items-center gap-8">
        <Recent />
        <NextGame />
      </div>
      <div className="flex flex-col gap-8 py-10">
        <BattingStats />
        <PitchingStats />
      </div>
    </>
  );
}
