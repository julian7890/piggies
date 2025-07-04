import { db } from "@/drizzle/db";
import { eq, sql } from "drizzle-orm";
import { GameTable, OrderTable } from "@/drizzle/schema";
import { NextResponse } from "next/server";
import { number } from "zod";

export async function POST(request: any) {
  const uploadData = await request.json();

  const game = await db
    .select()
    .from(GameTable)
    .where(sql`CAST(${GameTable.gameDate} AS date) = ${uploadData}`);

  const startingOrder: any = [];

  const order = await db.query.OrderTable.findMany({
    where: eq(OrderTable.gameId, game[0].id),
    with: { player: true },
  });

  type PlayerData = {
    playerId: string;
    name: string;
    batting: number | null;
    number: number | null;
    position: string | null;
  };

  order.forEach((entry) => {
    const playerData: PlayerData = {
      playerId: entry.playerId,
      name: entry.player.name,
      batting: entry.batting,
      position: entry.position,
      number: entry.player.number,
    };
    startingOrder.push(playerData);
  });

  console.log(startingOrder);

  // for (let playerId of (game[0].order as Array<string>) || [""]) {
  //   if (!playerId) {
  //     break;
  //   }

  /* for (let playerId of (game[0].order as Array<string>) || [""]) {
    const player = await db
      .selectDistinct()
      .from(PlayerTable)
      .where(eq(PlayerTable.id, playerId));

    startingOrder.push(player[0]);
  } */

  return NextResponse.json(startingOrder);
}
