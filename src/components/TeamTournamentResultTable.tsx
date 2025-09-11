import React from "react";
import { Table, TableProps } from "antd";
import { ColumnsType } from "antd/es/table";
import { TeamTournamentResult } from "../hooks/useTeamTournamentRankingsData";
import {
  convertDateFormat,
  getNumberOfWins,
  onRowClick,
} from "./IndividualResultTable";
import clsx from "clsx";
import "../styles/table.css";

const individualResultsColumns: ColumnsType<TeamTournamentResult> = [
  {
    title: "Team Name",
    dataIndex: "team_display_name",
  },
  {
    title: "Punkte",
    dataIndex: "points",
    sorter: (a, b) => a.points - b.points,
    defaultSortOrder: "descend",
    sortDirections: ["descend", "ascend"],
    render: (value) => value.toFixed(2),
    showSorterTooltip: false,
    className: "custom-first-column",
  },
  {
    title: "Datum",
    key: "date",
    dataIndex: "date",
    render: (value, record) => convertDateFormat(record.date),
    sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    sortDirections: ["descend", "ascend"],
    showSorterTooltip: false,
  },
  {
    title: "Turnier",
    key: "tournament_name",
    dataIndex: "tournament_name",
  },
  {
    title: "Typ",
    dataIndex: "players_per_team",
    key: "players_per_team",
    render: (value) => `${value}er`,
  },
  {
    title: "Platz.",
    key: "placement",
    render: (text, record) => (
      <span>
        {record.placing}/{record.total_teams}
      </span>
    ),
  },
  {
    title: "Siege",
    render: (text, record) => (
      <span>{`${getNumberOfWins(record)}/${record.games}`}</span>
    ),
  },
];

const isResultCounted = ({
  individualResults,
  result,
}: {
  individualResults: TeamTournamentResult[];
  result: TeamTournamentResult;
}) => {
  return individualResults.find(
    (x) =>
      `${x.tournament_ID}-${x.team_display_name}-${x.points}` ===
      `${result.tournament_ID}-${result.team_display_name}-${result.points}`
  );
};

const TeamTournamentResultTable = (
  props: TableProps<TeamTournamentResult> & {
    individualResults: TeamTournamentResult[];
  }
) => {
  return (
    <Table<TeamTournamentResult>
      {...props}
      columns={[
        ...(props.columns ? props.columns : []),
        ...individualResultsColumns,
      ]}
      rowKey={(record) => `${record.tournament_ID}-${record.team_display_name}-${record.points}`}
      pagination={false}
      onRow={(record) => ({
        onClick: () =>
          onRowClick({
            tournament_id: record.tournament_ID,
            tournament_site: record.tournament_site,
          }),
      })}
      rowClassName={(result) =>
        clsx(
          result.tournament_ID && "clickable",
          !isResultCounted({
            individualResults: props.individualResults,
            result: result,
          }) && "result-not-counted"
        )
      }
    />
  );
};

export default TeamTournamentResultTable;
