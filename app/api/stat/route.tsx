import { db } from "@/drizzle/db";
import { eq, sql, and } from "drizzle-orm";
import { GameTable, PlayerTable, StatTable } from "@/drizzle/schema";
import { NextResponse } from "next/server";
import { format } from "date-fns";

export async function POST(request: any) {
  const uploadData = await request.json();

  const game = await db
    .select()
    .from(GameTable)
    .where(sql`CAST(${GameTable.gameDate} AS date) = ${uploadData.date}`);

  const player = await db
    .select()
    .from(PlayerTable)
    .where(eq(PlayerTable.name, uploadData.player));

  const checkEntry = await db
    .select()
    .from(StatTable)
    .where(
      and(
        eq(StatTable.gameId, game[0].id),
        eq(StatTable.playerId, player[0].id)
      )
    );

  if (checkEntry.length) {
    const errorResponse = {
      status: "error",
      message: `${uploadData.player}'s stat already exists for game on ${format(
        uploadData.date,
        "PPP"
      )}`,
    };

    return NextResponse.json(errorResponse);
  } else {
    uploadData.gameId = game[0].id;
    uploadData.playerId = player[0].id;

    const result = await db.insert(StatTable).values(uploadData);

    return NextResponse.json(result);
  }
}
