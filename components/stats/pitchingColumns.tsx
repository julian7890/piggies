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
    accessorFn: (row) =>
      ((row.earnedRuns * 7) / (row.innings / 3)).toFixed(2),
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
    accessorFn: (row) => {
      const whole = Math.floor(row.innings / 3);
      switch (row.innings % 3) {
        case 0:
          return whole;
        case 1:
          return whole + "⅓";
        case 2:
          return whole + "⅔";
      }
    },
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
    header: "HR",
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
    accessorFn: (row) => ((row.walks + row.hits) / (row.innings / 3) || 0).toFixed(2),
  },
];
