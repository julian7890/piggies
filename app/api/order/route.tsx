import { db } from "@/drizzle/db";
import { eq, sql } from "drizzle-orm";
import { GameTable, OrderTable, PlayerTable } from "@/drizzle/schema";
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

  const order = await db
    .select()
    .from(OrderTable)
    .where(eq(OrderTable.gameId, game[0].id));

  console.log(order);

  // const checkEntry = await db.select().from(GameTable);

  // const result = await db
  //   .update(GameTable)
  //   .set({
  //     order: sql.raw(
  //       `JSON_ARRAY_APPEND(order, ${JSON.stringify(player)}, true)`
  //     ),
  //   })
  //   .where(eq(GameTable.id, game[0].id))
  //   .returning({ order: GameTable.order });

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
  uploadData.gameId = game[0].id;
  uploadData.playerId = player[0].id;
  uploadData.batting = order.length + 1;

  const result = await db.insert(OrderTable).values(uploadData);

  return NextResponse.json(result);
}
