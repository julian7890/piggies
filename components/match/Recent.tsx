import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { format } from "date-fns";

const scoreTable = (scoreData: (number | null)[], home: boolean) => {
  const lastInputIndex = scoreData.findIndex((input) => input == null) - 1;
  if (scoreData) {
    return scoreData.map((score, index) => (
      <TableCell key={index} className="text-center">
        {home && index == lastInputIndex && score !== 0
          ? score + "x"
          : score == null
          ? "x"
          : score}
      </TableCell>
    ));
  }
};

const runsCalc = (scoreData: (number | null)[]) => {
  let result = 0;
  if (scoreData) {
    for (let score of scoreData) {
      result += Number(score) || 0;
    }
  }
  return result;
};

export default function Recent({ previousGame }: any) {
  const previousGameDate = format(previousGame.gameDate, "P");

  const formatScore = (scoreData: string) => {
    const arr: (number | null)[] = scoreData?.split("").map((n) => +n);
    while (arr?.length < 7) {
      arr.push(null);
    }
    return arr;
  };

  const piggiesData = {
    name: "PIG",
    scoreData: formatScore(previousGame.selfResult),
  };
  const opponentData = {
    name: previousGame.opponent,
    scoreData: formatScore(previousGame.opponentResult),
  };

  const data = {
    visitor: previousGame.homeTeam ? opponentData : piggiesData,
    home: previousGame.homeTeam ? piggiesData : opponentData,
  };

  const homeTotal = runsCalc(data.home.scoreData);
  const visitorTotal = runsCalc(data.visitor.scoreData);

  return (
    <div className="flex justify-center pt-4">
      <div>
        <Table className="text-md md:text-2xl scale-90 sm:scale-100">
          <TableCaption>Result {previousGameDate}</TableCaption>
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
              <TableCell>{data.visitor.name}</TableCell>
              {scoreTable(data.visitor.scoreData, false)}
              <TableCell
                className={`${
                  visitorTotal > homeTotal ? "font-bold" : ""
                } border`}
              >
                {visitorTotal}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{data.home.name}</TableCell>
              {scoreTable(data.home.scoreData, true)}
              <TableCell
                className={`${
                  homeTotal > visitorTotal ? "font-bold" : ""
                } border`}
              >
                {homeTotal}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
