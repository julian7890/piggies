import { db } from "@/drizzle/db";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await db.query.PlayerTable.findMany({});
  return NextResponse.json(result);
}
