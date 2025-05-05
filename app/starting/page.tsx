import React from "react";
import Starting from "@/components/starting/Starting";
import NextGame from "@/components/match/NextGame";
import { db } from "@/drizzle/db";
import { GameTable } from "@/drizzle/schema";
import { gte } from "drizzle-orm";

export default async function StartingPage() {
  const nextGame = await db
    .select()
    .from(GameTable)
    .where(gte(GameTable.gameDate, new Date()));

  return (
    <div>
      <div className="flex justify-center">
        <NextGame nextGame={nextGame[0]} />
      </div>
      <Starting />
    </div>
  );
}
