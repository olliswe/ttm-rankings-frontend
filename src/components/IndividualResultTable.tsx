import React from "react";
import { Table, TableProps } from "antd";
import { IndividualResult } from "../useRankingsData";
import { ColumnsType } from "antd/es/table";

const convertDateFormat = (dateString: string): string => {
  const parts: string[] = dateString.split("-");
  return `${parts[2]}.${parts[1]}.${parts[0]}`;
};

const getNumberOfWins = (individualResult: IndividualResult) => {
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
    title: "Platzierung",
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
    title: "Team",
    dataIndex: "team",
    key: "team",
    render: (value) => <div style={{ width: 150 }}>{value}</div>,
  },
];

const IndividualResultTable = (props: TableProps<IndividualResult>) => {
  return (
    <Table<IndividualResult>
      columns={individualResultsColumns}
      rowKey={"tournament_name"}
      pagination={false}
      onRow={(record) => ({
        ...(record.tournament_id
          ? {
              onClick: () =>
                window.open(
                  `https://www.bestcoastpairings.com/event/${record.tournament_id}`,
                  "_blank"
                ),
            }
          : {}),
      })}
      {...props}
    />
  );
};

export default IndividualResultTable;
