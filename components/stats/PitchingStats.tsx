import { Player, columns } from "@/components/stats/pitchingColumns";
import { DataTable } from "@/components/ui/data-table";

async function getData(): Promise<Player[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      name: "Julian",
      number: 0,
      games: 0,
      wins: 0,
      loss: 0,
      saves: 0,
      innings: 0,
      hits: 0,
      runs: 0,
      earnedRuns: 0,
      homerun: 0,
      walks: 0,
      hitBatsmen: 0,
      strikeouts: 0,
    },
    {
      id: "2",
      name: "testPitcher",
      number: 20,
      games: 20,
      wins: 20,
      loss: 20,
      saves: 20,
      innings: 20,
      hits: 20,
      runs: 20,
      earnedRuns: 20,
      homerun: 20,
      walks: 20,
      hitBatsmen: 20,
      strikeouts: 20,
    },
    {
      id: "3",
      name: "testPitcher2",
      number: 40,
      games: 40,
      wins: 40,
      loss: 40,
      saves: 40,
      innings: 40,
      hits: 40,
      runs: 40,
      earnedRuns: 40,
      homerun: 40,
      walks: 40,
      hitBatsmen: 40,
      strikeouts: 40,
    },
  ];
}

export default async function PitchingStats() {
  const data = await getData();

  return (
    <div className="container md:max-w-full mx-auto md:px-20 md:text-2xl">
      <div className="flex justify-center">Pitching Stats</div>
      <DataTable
        columns={columns}
        data={data}
        initial={{ id: "ERA", desc: false, asc: true }}
      />
    </div>
  );
}
