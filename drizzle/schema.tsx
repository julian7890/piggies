import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  // primaryKey,
  unique,
  uuid,
  varchar,
  time,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const PlayerTable = pgTable(
  "player",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    number: integer("number").notNull(),
  },
  (table) => {
    return {
      uniqueNameAndNumber: unique("uniqueNameAndNumber").on(
        table.name,
        table.number
      ),
    };
  }
);

export const StatTable = pgTable("stat", {
  id: uuid("id").primaryKey().defaultRandom(),
  gameId: uuid("gameId")
    .references(() => GameTable.id)
    .notNull(),
  playerId: uuid("playerId")
    .references(() => PlayerTable.id)
    .notNull(),
  ["1st"]: varchar("1st", { length: 255 }),
  ["2nd"]: varchar("2nd", { length: 255 }),
  ["3rd"]: varchar("3rd", { length: 255 }),
  ["4th"]: varchar("4th", { length: 255 }),
  ["5th"]: varchar("5th", { length: 255 }),
  runs: integer("runs"),
  RBI: integer("RBI"),
  SB: integer("SB"),
  IPthird: integer("IPthird"),
  SO: integer("SO"),
  hitsAllowed: integer("hitsAllowed"),
  runsAllowed: integer("runsAllowed"),
  earnedRunsAllowed: integer("earnedRunsAllowed"),
  homerunAllowed: integer("homerunAllowed"),
  HB: integer("HB"),
  walksAllowed: integer("walksAllowed"),
  pitcherRecord: varchar("pitcherRecord", { length: 255 }),
});

export const OrderTable = pgTable("order", {
  id: uuid("id").primaryKey().defaultRandom(),
  gameId: uuid("gameId")
    .references(() => GameTable.id)
    .notNull(),
  playerId: uuid("playerId")
    .references(() => PlayerTable.id)
    .notNull(),
  position: varchar("position", { length: 255 }),
  batting: integer("batting"),
});

export const GameTable = pgTable("game", {
  id: uuid("id").primaryKey().defaultRandom(),
  gameDate: timestamp("gameDate", { mode: "date" }),
  gameTime: time("gameTime"),
  field: varchar("field", { length: 255 }),
  opponent: varchar("opponent", { length: 255 }),
  selfResult: varchar("selfResult", { length: 255 }),
  opponentResult: varchar("opponentResult", { length: 255 }),
  homeTeam: boolean("homeTeam"),
});

// export const GameStatTable = pgTable(
//   "gameStat",
//   {
//     gameId: uuid("gameId").references(() => GameTable.id),
//     statId: uuid("statId").references(() => StatTable.id),
//   },
//   (table) => {
//     return {
//       pk: primaryKey({ columns: [table.gameId, table.statId] }),
//     };
//   }
// );

//RELATIONS

export const PlayerTableRelations = relations(PlayerTable, ({ many }) => {
  return {
    game: many(GameTable),
    stat: many(StatTable),
    order: many(OrderTable),
  };
});

export const GameTableRelations = relations(GameTable, ({ many }) => {
  return {
    player: many(PlayerTable),
    stat: many(StatTable),
  };
});

export const OrderTableRelations = relations(OrderTable, ({ many, one }) => {
  return {
    player: one(PlayerTable, {
      fields: [OrderTable.playerId],
      references: [PlayerTable.id],
    }),
    game: one(GameTable, {
      fields: [OrderTable.gameId],
      references: [GameTable.id],
    }),
  };
});

export const StatTableRelations = relations(StatTable, ({ one }) => {
  return {
    game: one(GameTable, {
      fields: [StatTable.gameId],
      references: [GameTable.id],
    }),
    player: one(PlayerTable, {
      fields: [StatTable.playerId],
      references: [PlayerTable.id],
    }),
  };
});
