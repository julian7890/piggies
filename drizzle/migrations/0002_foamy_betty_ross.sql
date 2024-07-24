ALTER TABLE "game" RENAME COLUMN "playerId" TO "field";--> statement-breakpoint
ALTER TABLE "game" DROP CONSTRAINT "game_playerId_player_id_fk";
--> statement-breakpoint
ALTER TABLE "game" ALTER COLUMN "field" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "game" ADD COLUMN "gameTime" time;