CREATE TABLE IF NOT EXISTS "gameStat" (
	"gameId" uuid,
	"statId" uuid,
	CONSTRAINT "gameStat_gameId_statId_pk" PRIMARY KEY("gameId","statId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "game" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"gameDate" date,
	"playerId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stat" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"statsId" uuid,
	"playerId" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "player" ADD COLUMN "number" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gameStat" ADD CONSTRAINT "gameStat_gameId_game_id_fk" FOREIGN KEY ("gameId") REFERENCES "public"."game"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gameStat" ADD CONSTRAINT "gameStat_statId_stat_id_fk" FOREIGN KEY ("statId") REFERENCES "public"."stat"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "game" ADD CONSTRAINT "game_playerId_player_id_fk" FOREIGN KEY ("playerId") REFERENCES "public"."player"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stat" ADD CONSTRAINT "stat_statsId_game_id_fk" FOREIGN KEY ("statsId") REFERENCES "public"."game"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stat" ADD CONSTRAINT "stat_playerId_player_id_fk" FOREIGN KEY ("playerId") REFERENCES "public"."player"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "player" ADD CONSTRAINT "uniqueNameAndNumber" UNIQUE("name","number");