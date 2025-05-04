"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Player = {
  id: string;
  name: string;
  number: number;
  games: number;
  atBat: number;
  runs: number;
  single: number;
  double: number;
  triple: number;
  homerun: number;
  RBI: number;
  walks: number;
  hitByPitch: number;
  sacrificeFlies: number;
  stolenBase: number;
  strike: number;
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
    accessorKey: "games",
    header: "GP",
  },
  {
    accessorKey: "atBat",
    header: "AB",
  },
  {
    accessorKey: "hits",
    header: "H",
    accessorFn: (row) => row.single + row.double + row.triple + row.homerun,
  },
  {
    accessorKey: "average",
    header: "AVG",
    accessorFn: (row) =>
      (
        (row.single + row.double + row.triple + row.homerun) / (row.atBat - row.hitByPitch - row.walks - row.sacrificeFlies) || 0
      ).toFixed(3),
    sortDescFirst: true,
  },
  {
    accessorKey: "double",
    header: "2B",
  },
  {
    accessorKey: "triple",
    header: "3B",
  },
  {
    accessorKey: "homerun",
    header: "HR",
  },
  {
    accessorKey: "RBI",
    header: "RBI",
  },
  {
    accessorKey: "runs",
    header: "R",
  },
  {
    accessorKey: "walks",
    header: "BB",
  },
  {
    accessorKey: "hitByPitch",
    header: "HBP",
  },
  {
    accessorKey: "strike",
    header: "K",
  },
  {
    accessorKey: "stolenBase",
    header: "SB",
  },
  {
    accessorKey: "OBP",
    header: "OBP",
    accessorFn: (row) =>
      (
        (row.single +
          row.double +
          row.triple +
          row.homerun +
          row.walks +
          row.hitByPitch) /
          (row.atBat + row.walks + row.hitByPitch + row.sacrificeFlies) || 0
      ).toFixed(3),
    sortDescFirst: true,
  },
  {
    accessorKey: "SLG",
    header: "SLG",
    accessorFn: (row) =>
      (
        (row.single + row.double * 2 + row.triple * 3 + row.homerun * 4) /
          row.atBat || 0
      ).toFixed(3),
    sortDescFirst: true,
  },
  {
    accessorKey: "OPS",
    header: "OPS",
    accessorFn: (row) =>
      (
        (row.single +
          row.double +
          row.triple +
          row.homerun +
          row.walks +
          row.hitByPitch) /
          (row.atBat + row.walks + row.hitByPitch + row.sacrificeFlies) +
          (row.single + row.double * 2 + row.triple * 3 + row.homerun * 4) /
            row.atBat || 0
      ).toFixed(3),
    sortDescFirst: true,
  },
];
