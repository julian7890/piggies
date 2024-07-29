import { Player, columns } from "@/components/stats/pitchingColumns";
import { DataTable } from "@/components/ui/data-table";
import { db } from "@/drizzle/db";
import { PlayerTable, StatTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

type PlayerData = {
  id: string;
  name: string;
  number: number;
};

type Indexable = {
  [key: string]: any;
};

async function getData(): Promise<Player[]> {
  const playerList = await db.select().from(PlayerTable);

  const getStat = async (player: PlayerData) => {
    const personalStat = await db
      .select()
      .from(StatTable)
      .where(eq(StatTable.playerId, player.id));

    const playResult = (playType: string) => {
      let total = 0;
      for (let stat of personalStat) {
        total += (stat as Indexable)[playType] || 0;
      }
      return total;
    };

    const pitchResult = (resultType: string) => {
      let count = 0;
      for (let stat of personalStat) {
        stat.pitcherRecord == resultType && count++;
      }
      return count;
    };

    const inningsTotal = () => {
      let total = 0;
      for (let stat of personalStat) {
        total += stat.IPthird || 0;
      }
      return total;
    };

    const finalStat = {
      id: player.id,
      name: player.name,
      number: player.number,
      games: personalStat.length,
      wins: pitchResult("wins"),
      loss: pitchResult("loss"),
      saves: pitchResult("saves"),
      innings: inningsTotal(),
      hits: playResult("hitsAllowed"),
      runs: playResult("runsAllowed"),
      earnedRuns: playResult("earnedRunsAllowed"),
      homerun: playResult("homeRunsAllowed"),
      walks: playResult("walksAllowed"),
      hitBatsmen: playResult("HB"),
      strikeouts: playResult("SO"),
    };

    return finalStat;
  };

  const statData = await Promise.all(
    playerList.map((player) => getStat(player))
  );
  const filteredData = statData.filter((stat) => stat.innings !== 0);
  return filteredData;
}

export default async function PitchingStats() {
  const data = await getData();

  return (
    <div className="container md:max-w-full mx-auto md:px-20 md:text-2xl">
      <div className="flex justify-center">Pitching Stats</div>
      <div className="text-sm text-muted-foreground flex">
        <div>ERA adjusted to 7 innings per game</div>
      </div>
      <DataTable
        columns={columns}
        data={data}
        initial={{ id: "ERA", desc: false, asc: true }}
      />
    </div>
  );
}
