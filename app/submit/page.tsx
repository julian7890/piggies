import SubmitForm from "@/components/submit/submitForm";
import { db } from "@/drizzle/db";
import { GameTable, PlayerTable } from "@/drizzle/schema";
import { format } from "date-fns";

export default async function SubmitPage() {
  const playerList = await db.select().from(PlayerTable);
  const gameDates = (
    await db.select({ gameDate: GameTable.gameDate }).from(GameTable)
  ).map((game) => format(game.gameDate as Date, "P"));
  return <SubmitForm playerList={playerList} gameDates={gameDates} />;
}
