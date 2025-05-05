import { db } from "@/drizzle/db";
import { eq, sql } from "drizzle-orm";
import { GameTable, PlayerTable } from "@/drizzle/schema";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const uploadData = await request.json();

  console.log(uploadData);

  const game = await db
    .select()
    .from(GameTable)
    .where(sql`CAST(${GameTable.gameDate} AS date) = ${uploadData.date}`);

  const player = await db
    .select()
    .from(PlayerTable)
    .where(eq(PlayerTable.name, uploadData.player));

  // const checkEntry = await db.select().from(GameTable);

  const result = await db
    .update(GameTable)
    .set({
      order: [...((game[0].order as Array<string>) || [""]), player[0].id],
    })
    .where(eq(GameTable.id, game[0].id))
    .returning({ order: GameTable.order });

  // if (checkEntry.length) {
  //   const errorResponse = {
  //     status: "error",
  //     message: `${uploadData.player}'s stat already exists for game on ${format(
  //       uploadData.date,
  //       "PPP"
  //     )}`,
  //   };

  //   return NextResponse.json(errorResponse);
  // } else {
  //   uploadData.gameId = game[0].id;
  //   uploadData.playerId = player[0].id;

  // const result = await db.insert(StatTable).values(uploadData);

  return NextResponse.json(result);
}
