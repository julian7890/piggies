import SubmitForm from "@/components/submit/submitForm";
import { db } from "@/drizzle/db";
import { PlayerTable } from "@/drizzle/schema";

export default async function SubmitPage() {
  const playerList = await db.select().from(PlayerTable);
  return <SubmitForm playerList={playerList} />;
}
