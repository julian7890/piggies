import { db } from "../drizzle/db";
import { PlayerTable, GameTable } from "../drizzle/schema";
import { format } from "date-fns";

async function main() {
  const dateTime = new Date(2024, 6, 21, 7);
  const date = format(dateTime, "PP");
  const time = format(dateTime, "p");
  await db
    .insert(GameTable)
    .values({
      gameDate: date,
      field: "Central Park Field #3",
      gameTime: time,
    })
    .returning({
      id: GameTable.id,
    });

  // await db
  //   .insert(PlayerTable)
  //   .values([
  //     {
  //       name: "Hayato",
  //       number: 1,
  //     },
  //     {
  //       name: "Tomoya",
  //       number: 2,
  //     },
  //     {
  //       name: "Albert",
  //       number: 3,
  //     },
  //     {
  //       name: "JP",
  //       number: 4,
  //     },
  //     {
  //       name: "Takuya",
  //       number: 5,
  //     },
  //     {
  //       name: "Matsuno",
  //       number: 6,
  //     },
  //     {
  //       name: "Yuya",
  //       number: 7,
  //     },
  //     {
  //       name: "Iida",
  //       number: 8,
  //     },
  //     {
  //       name: "Odagiri",
  //       number: 9,
  //     },
  //     {
  //       name: "Kawabata",
  //       number: 10,
  //     },
  //     {
  //       name: "Julian",
  //       number: 11,
  //     },
  //     {
  //       name: "Shuma",
  //       number: 12,
  //     },
  //     {
  //       name: "Ryuno",
  //       number: 13,
  //     },
  //     {
  //       name: "Inoue",
  //       number: 14,
  //     },
  //     {
  //       name: "Romeo",
  //       number: 15,
  //     },
  //     {
  //       name: "Noma",
  //       number: 16,
  //     },
  //   ])
  //   .returning({
  //     id: PlayerTable.id,
  //   });
}

main();
