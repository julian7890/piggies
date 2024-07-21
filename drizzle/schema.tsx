import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const PlayerTable = pgTable("player", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
});
