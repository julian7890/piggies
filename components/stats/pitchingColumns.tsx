"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Player = {
  id: string;
  name: string;
  number: number;
  games: number;
  wins: number;
  loss: number;
  saves: number;
  innings: number;
  hits: number;
  runs: number;
  earnedRuns: number;
  homerun: number;
  walks: number;
  hitBatsmen: number;
  strikeouts: number;
};

export const columns: ColumnDef<Player>[] = [
  {
    accessorKey: "name",
    header: "Name",
    enableHiding: false,
  },
  {
    accessorKey: "number",
    header: "#",
    enableHiding: false,
  },
  {
    accessorKey: "wins",
    header: "W",
  },
  {
    accessorKey: "loss",
    header: "L",
  },
  {
    accessorKey: "ERA",
    header: "ERA",
    accessorFn: (row) => ((row.earnedRuns * 9) / row.innings || 0).toFixed(2),
  },
  {
    accessorKey: "games",
    header: "G",
  },
  {
    accessorKey: "saves",
    header: "SV",
  },
  {
    accessorKey: "innings",
    header: "IP",
  },
  {
    accessorKey: "hits",
    header: "H",
  },
  {
    accessorKey: "runs",
    header: "R",
  },
  {
    accessorKey: "earnedRuns",
    header: "ER",
  },
  {
    accessorKey: "homerun",
    header: "H",
  },
  {
    accessorKey: "hitBatsmen",
    header: "HB",
  },
  {
    accessorKey: "walks",
    header: "BB",
  },
  {
    accessorKey: "WHIP",
    header: "WHIP",
    accessorFn: (row) => ((row.walks + row.hits) / row.innings || 0).toFixed(2),
  },
];
