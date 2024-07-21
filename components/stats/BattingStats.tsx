import { Player, columns } from "@/components/stats/battingColumns";
import { DataTable } from "@/components/ui/data-table";

async function getData(): Promise<Player[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      name: "Julian",
      number: 11,
      games: 0,
      atBat: 0,
      runs: 0,
      single: 0,
      double: 0,
      triple: 0,
      homerun: 0,
      RBI: 0,
      walks: 0,
      hitByPitch: 0,
      sacrificeFlies: 0,
      stolenBase: 0,
      strike: 0,
    },
    {
      id: "2",
      name: "test",
      number: 99,
      games: 99,
      atBat: 99,
      runs: 99,
      single: 20,
      double: 20,
      triple: 20,
      homerun: 20,
      RBI: 99,
      walks: 99,
      hitByPitch: 99,
      sacrificeFlies: 99,
      stolenBase: 99,
      strike: 99,
    },
    {
      id: "3",
      name: "test2",
      number: 50,
      games: 50,
      atBat: 50,
      runs: 50,
      single: 10,
      double: 10,
      triple: 10,
      homerun: 10,
      RBI: 50,
      walks: 50,
      hitByPitch: 50,
      sacrificeFlies: 50,
      stolenBase: 50,
      strike: 50,
    },
  ];
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
