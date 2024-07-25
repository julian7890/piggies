ALTER TABLE "stat" RENAME COLUMN "statsId" TO "gameId";--> statement-breakpoint
ALTER TABLE "stat" DROP CONSTRAINT "stat_statsId_game_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stat" ADD CONSTRAINT "stat_gameId_game_id_fk" FOREIGN KEY ("gameId") REFERENCES "public"."game"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
