import NextGame from "@/components/match/NextGame";
import Recent from "@/components/match/Recent";
import BattingStats from "@/components/stats/BattingStats";
import PitchingStats from "@/components/stats/PitchingStats";
import { db } from "@/drizzle/db";
import { GameTable } from "@/drizzle/schema";
import { gte, lte, desc } from "drizzle-orm";

export default async function Home() {
  const nextGame = await db
    .select()
    .from(GameTable)
    .where(gte(GameTable.gameDate, new Date()));

  const previousGame = await db
    .select()
    .from(GameTable)
    .where(lte(GameTable.gameDate, new Date()))
    .orderBy(desc(GameTable.gameDate));

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center md:items-center gap-8">
        <Recent previousGame={previousGame[0]} />
        <NextGame nextGame={nextGame[0]} />
      </div>
      <div className="flex flex-col gap-8 py-10">
        <BattingStats />
        <PitchingStats />
      </div>
    </>
  );
}
