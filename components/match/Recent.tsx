import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data = {
  team1: { name: "B&B", scoreData: [1, 0, 1, 0, 0, 0, null] },
  team2: { name: "PIG", scoreData: [0, 2, 0, 1, 4, null, null] },
};

const scoreTable = (scoreData: (number | null)[]) => {
  return scoreData.map((score, index) => (
    <TableCell key={index}>{score == null ? "x" : score}</TableCell>
  ));
};

const runsCalc = (scoreData: (number | null)[]) => {
  let result = 0;
  for (let score of scoreData) {
    result += score || 0;
  }
  return result;
};

export default function Recent() {
  return (
    <div className="flex justify-center">
      <div>
        <Table className="text-md md:text-2xl">
          <TableCaption>Result 7/14/2024</TableCaption>
          <TableBody>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>1</TableHead>
              <TableHead>2</TableHead>
              <TableHead>3</TableHead>
              <TableHead>4</TableHead>
              <TableHead>5</TableHead>
              <TableHead>6</TableHead>
              <TableHead>7</TableHead>
              <TableHead className="text-white border">R</TableHead>
            </TableRow>
            <TableRow>
              <TableCell>{data.team1.name}</TableCell>
              {scoreTable(data.team1.scoreData)}
              <TableCell className="border">
                {runsCalc(data.team1.scoreData)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{data.team2.name}</TableCell>
              {scoreTable(data.team2.scoreData)}
              <TableCell className="font-bold border">
                {runsCalc(data.team2.scoreData)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
