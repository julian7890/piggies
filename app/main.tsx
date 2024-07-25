import { db } from "../drizzle/db";
import { PlayerTable, GameTable } from "../drizzle/schema";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

async function main() {
  const dateTime = toZonedTime(new Date(2024, 6, 28, 7), "America/New_York");

  const entry = (
    year: number,
    month: number,
    day: number,
    hour: number,
    fieldName: string,
    opponentName: string,
    homeTeam?: boolean,
    selfResult?: string,
    opponentResult?: string,
  ) => {
    const dateTime = toZonedTime(
      new Date(year, month, day, hour),
      "America/New_York"
    );

    const time = format(dateTime, "p");

    return {
      gameDate: dateTime,
      gameTime: time,
      field: fieldName,
      opponent: opponentName,
      selfResult: selfResult,
      opponentResult: opponentResult,
      homeTeam: homeTeam
    };
  };

  await db
    .insert(GameTable)
    .values([
      entry(2024, 6, 28, 7, "Randall's Island Field #48", "NIK"),
      entry(2024, 6, 21, 8, "Central Park Field #3", "KZR",true, "000100", "012004"),
      entry(
        2024,
        6,
        14,
        9,
        "Randall's Island Field #41",
        "B&B",
        true,
        "02014",
        "101000"
      ),
    ])
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
