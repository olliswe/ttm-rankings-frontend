import React, { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd";
import { IndividualResult, RankingsData } from "./useRankingsData";
import NameSearch from "./NameSearch";
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";

const individualResultsColumns: ColumnsType<IndividualResult> = [
  {
    title: "Datum",
    key: "date",
    dataIndex: "date",
    sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    sortOrder: "descend",
    sortDirections: ["descend"],
    showSorterTooltip: false,
  },
  {
    title: "Turnier",
    key: "tournament_name",
    dataIndex: "tournament_name",
  },
  {
    title: "Plazierung",
    key: "placement",
    dataIndex: "placement",
  },
  {
    title: "Punkte",
    dataIndex: "ttm_points",
    render: (value) => value.toFixed(2),
  },
  {
    title: "Faktion",
    key: "faction",
    dataIndex: "faction",
  },
  {
    title: "Spielgröße",
    render: (value) => `${value}pts`,
    dataIndex: "battle_size",
  },
  { title: "Typ", dataIndex: "tournament_type", key: "tournament_type" },
  { title: "Anz. Spieler", dataIndex: "players", key: "players" },
  { title: "Anz. Runden", dataIndex: "rounds", key: "rouns" },
  { title: "Team", dataIndex: "team", key: "team" },
];

const getRankingIcon = (record: RankingsData) => {
  if (record.last_week_ttm_ranking > record.ttm_ranking)
    return <CaretUpFilled style={{ color: "green" }} />;
  if (record.last_week_ttm_ranking < record.ttm_ranking)
    return <CaretDownFilled style={{ color: "red" }} />;
  return <></>;
};

const columns: ColumnsType<RankingsData> = [
  { title: "Ranking", dataIndex: "ttm_ranking", key: "ttm_ranking" },
  {
    title: "Vorwoche",
    dataIndex: "last_week_ttm_ranking",
    key: "last_week_ttm_ranking",
    render: (text, record) => (
      <>
        <div
          style={{
            color: "grey",
            opacity: 0.5,
            width: 30,
            display: "inline-block",
          }}
        >
          {text}
        </div>
        {getRankingIcon(record)}
      </>
    ),
  },
  {
    title: "Name",
    dataIndex: "display_name",
    key: "display_name",
    sorter: (a, b) => (a.display_name < b.display_name ? -1 : 1),
  },
  {
    title: "Punkte",
    render: (value) => value.toFixed(2),
    dataIndex: "total_points",
    sorter: (a, b) => a.total_points - b.total_points,
    defaultSortOrder: "descend",
  },
  {
    title: "Anz. Turniere",
    dataIndex: "nr_tournaments",
    key: "nr_tournaments",
    sorter: (a, b) => a.nr_tournaments - b.nr_tournaments,
  },
];

const RankingsTable = ({
  dataSource,
  loading,
}: {
  dataSource: RankingsData[];
  loading: boolean;
}) => {
  const [results, setResults] = useState<RankingsData[]>([]);

  useEffect(() => {
    setResults(dataSource);
  }, [dataSource]);

  return (
    <>
      <div style={{ width: 500, marginBottom: 20 }}>
        <NameSearch fullDataSet={dataSource} setResults={setResults} />
      </div>
      <Table<RankingsData>
        dataSource={results}
        columns={columns}
        loading={loading}
        rowKey={"identifier"}
        pagination={{
          pageSize: 50,
          showSizeChanger: false,
        }}
        expandable={{
          expandedRowRender: (record) => (
            <div style={{ maxWidth: 650, overflow: "scroll" }}>
              <Table<IndividualResult>
                dataSource={record.individual_results}
                columns={individualResultsColumns}
                rowKey={"tournament_name"}
                pagination={false}
              />
            </div>
          ),
          rowExpandable: () => true,
        }}
      />
    </>
  );
};

export default RankingsTable;
