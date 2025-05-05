import Setting from "@/components/setting/Setting";
import { db } from "@/drizzle/db";
import { GameTable, PlayerTable } from "@/drizzle/schema";
import { format } from "date-fns";
import React from "react";

export default async function SettingPage() {
  const playerList = await db.select().from(PlayerTable);
  const gameDates = (
    await db.select({ gameDate: GameTable.gameDate }).from(GameTable)
  ).map((game) => format(game.gameDate as Date, "P"));

  playerList.sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div>
      <Setting playerList={playerList} gameDates={gameDates} />
    </div>
  );
}
