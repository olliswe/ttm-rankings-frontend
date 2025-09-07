import React from "react";
import { Table, TableProps } from "antd";
import { IndividualResult } from "../hooks/useRankingsData";
import { ColumnsType } from "antd/es/table";

export const convertDateFormat = (dateString: string): string => {
  const parts: string[] = dateString.split("-");
  return `${parts[2]}.${parts[1]}.${parts[0]}`;
};

export const getNumberOfWins = (individualResult: { wins: number }) => {
  const stringWins = String(individualResult.wins);
  if (stringWins === "") {
    return "?";
  }
  return stringWins;
};

const individualResultsColumns: ColumnsType<IndividualResult> = [
  {
    title: "Punkte",
    dataIndex: "ttm_points",
    sorter: (a, b) => a.ttm_points - b.ttm_points,
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
  { title: "Typ", dataIndex: "tournament_type", key: "tournament_type" },
  {
    title: "Platz.",
    key: "placement",
    render: (text, record) => (
      <span>
        {record.placement}/{record.players}
      </span>
    ),
  },
  {
    title: "Siege",
    render: (text, record) => (
      <span>{`${getNumberOfWins(record)}/${record.rounds}`}</span>
    ),
  },
  {
    title: "Fraktion",
    key: "faction",
    dataIndex: "faction",
  },
  {
    title: "Detachment",
    key: "detachment",
    dataIndex: "detachment",
  },
  {
    title: "Team",
    dataIndex: "best_team",
    key: "best_team",
    render: (value) => <div style={{ width: 150 }}>{value}</div>,
  },
];

export const onRowClick = (record: {
  tournament_id: string;
  tournament_site: string;
}) => {
  if (!record.tournament_id) {
    return;
  }
  if (record.tournament_site === "bcp") {
    return window.open(
      `https://www.bestcoastpairings.com/event/${record.tournament_id}`,
      "_blank"
    );
  }
  if (record.tournament_site === "herald") {
    return window.open(
      `https://www.tabletop-herald.com/warhammer-40000/de/tournaments/${record.tournament_id}/rankings`,
      "_blank"
    );
  }
  if (record.tournament_site === "t3") {
    return window.open(
      `https://www.tabletopturniere.de/t3_tournament_results.php?tid=${record.tournament_id}`,
      "_blank"
    );
  }
  return;
};

const IndividualResultTable = (props: TableProps<IndividualResult>) => {
  return (
    <Table<IndividualResult>
      {...props}
      columns={[
        ...(props.columns ? props.columns : []),
        ...individualResultsColumns,
      ]}
      rowKey={"tournament_name"}
      pagination={false}
      onRow={(record) => ({
        onClick: () => onRowClick(record),
      })}
    />
  );
};

export default IndividualResultTable;
