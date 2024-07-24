import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { GameTable, PlayerTable, StatTable } from "@/drizzle/schema";
import { NextResponse } from "next/server";
import { format } from "date-fns";

export async function POST(request: any) {
  const uploadData = await request.json();

  const game = await db
    .select()
    .from(GameTable)
    .where(eq(GameTable.gameDate, format(uploadData.date, "PP")));

  const player = await db
    .select()
    .from(PlayerTable)
    .where(eq(PlayerTable.name, uploadData.player));

  uploadData.gameId = game[0].id;
  uploadData.playerId = player[0].id;

  const result = await db.insert(StatTable).values(uploadData);

  return NextResponse.json(result);
}
