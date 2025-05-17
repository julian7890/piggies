CREATE TABLE IF NOT EXISTS "game" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"gameDate" timestamp,
	"gameTime" time,
	"field" varchar(255),
	"opponent" varchar(255),
	"selfResult" varchar(255),
	"opponentResult" varchar(255),
	"homeTeam" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"gameId" uuid NOT NULL,
	"playerId" uuid NOT NULL,
	"position" varchar(255),
	"batting" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "player" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"number" integer NOT NULL,
	CONSTRAINT "uniqueNameAndNumber" UNIQUE("name","number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stat" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"gameId" uuid NOT NULL,
	"playerId" uuid NOT NULL,
	"1st" varchar(255),
	"2nd" varchar(255),
	"3rd" varchar(255),
	"4th" varchar(255),
	"5th" varchar(255),
	"runs" integer,
	"RBI" integer,
	"SB" integer,
	"IPthird" integer,
	"SO" integer,
	"hitsAllowed" integer,
	"runsAllowed" integer,
	"earnedRunsAllowed" integer,
	"homerunAllowed" integer,
	"HB" integer,
	"walksAllowed" integer,
	"pitcherRecord" varchar(255)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order" ADD CONSTRAINT "order_gameId_game_id_fk" FOREIGN KEY ("gameId") REFERENCES "public"."game"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order" ADD CONSTRAINT "order_playerId_player_id_fk" FOREIGN KEY ("playerId") REFERENCES "public"."player"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stat" ADD CONSTRAINT "stat_gameId_game_id_fk" FOREIGN KEY ("gameId") REFERENCES "public"."game"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stat" ADD CONSTRAINT "stat_playerId_player_id_fk" FOREIGN KEY ("playerId") REFERENCES "public"."player"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
