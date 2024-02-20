import React from "react";
import { ColumnsType } from "antd/es/table";
import { IndividualResult } from "./useRankingsData";

interface TeamRanking {
  points: number;
  players: number;
  tournaments: number;
  games: number;
  all_results: IndividualResult[];
  team: string;
  best_results: IndividualResult[];
}

const columns: ColumnsType<TeamRanking> = [
  {
    title: "Team",
    dataIndex: "team",
    key: "team",
  },
  {
    title: "Punkte",
    render: (value) => value.toFixed(2),
    dataIndex: "points",
    sorter: (a, b) => a.points - b.points,
    defaultSortOrder: "descend",
  },
  {
    title: "Anz. Spieler*innen",
    dataIndex: "players",
    sorter: (a, b) => a.players - b.players,
  },
  {
    title: "Anz. Turniere",
    dataIndex: "tournaments",
    sorter: (a, b) => a.tournaments - b.tournaments,
  },
  {
    title: "Anz. Spiele",
    dataIndex: "games",
  },
];

const MyComponent = () => {
  return <div></div>;
};

export default MyComponent;
