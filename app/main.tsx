import { db } from "../drizzle/db";
import { PlayerTable } from "../drizzle/schema";

async function main() {
  await db.insert(PlayerTable).values({
    name: "Julian",
    number: 11,
  });
  const player = await db.query.PlayerTable.findFirst();
  console.log(player);
}

main();
