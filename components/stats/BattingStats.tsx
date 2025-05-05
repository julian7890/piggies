import { Player, columns } from "@/components/stats/battingColumns";
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

    const atBat = () => {
      const adjustAtBat = ["BB", "HBP", "SF"];
      let count = 0;
      for (let stat of personalStat) {
        if (stat.playerId == "88f30fcc-c2a4-4c56-bcea-3422b71f021a") {
          console.log(stat);
        }
        stat["1st"] && !adjustAtBat.includes(stat["1st"] as string) && count++;
        stat["2nd"] && !adjustAtBat.includes(stat["2nd"] as string) && count++;
        stat["3rd"] && !adjustAtBat.includes(stat["3rd"] as string) && count++;
        stat["4th"] && !adjustAtBat.includes(stat["4th"] as string) && count++;
        stat["5th"] && !adjustAtBat.includes(stat["5th"] as string) && count++;
      }
      return count;
    };

    const playResult = (playType: string) => {
      let total = 0;
      for (let stat of personalStat) {
        total += (stat as Indexable)[playType] || 0;
      }
      return total;
    };

    const batResult = (resultType: string) => {
      let count = 0;
      for (let stat of personalStat) {
        stat["1st"] == resultType && count++;
        stat["2nd"] == resultType && count++;
        stat["3rd"] == resultType && count++;
        stat["4th"] == resultType && count++;
        stat["5th"] == resultType && count++;
      }
      return count;
    };

    const finalStat = {
      id: player.id,
      name: player.name,
      number: player.number,
      games: personalStat.length,
      atBat: atBat(),
      runs: playResult("runs"),
      single: batResult("1B"),
      double: batResult("2B"),
      triple: batResult("3B"),
      homerun: batResult("HR"),
      RBI: playResult("RBI"),
      walks: batResult("BB"),
      hitByPitch: batResult("HBP"),
      sacrificeFlies: batResult("SF"),
      stolenBase: playResult("SB"),
      strike: batResult("K"),
    };
    return finalStat;
  };

  const statData = await Promise.all(
    playerList.map((player) => getStat(player))
  );

  return statData;
}

export default async function BattingStats() {
  const data = await getData();

  return (
    <div className="container md:max-w-full mx-auto md:px-20 md:text-2xl">
      <div className="flex justify-center">Batting Stats</div>
      <DataTable
        columns={columns}
        data={data}
        initial={{ id: "average", desc: true, asc: false }}
      />
    </div>
  );
}
