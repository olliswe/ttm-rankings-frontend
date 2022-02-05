import React, { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd";
import { IndividualResult, RankingsData } from "./useRankingsData";
import NameSearch from "./NameSearch";

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
  { title: "Turnier", key: "tournament_name", dataIndex: "tournament_name" },
  {
    title: "Plazierung",
    key: "placement",
    dataIndex: "placement",
  },
  {
    title: "TTM-Punkte",
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

const columns: ColumnsType<RankingsData> = [
  { title: "TTM-Ranking", dataIndex: "ttm_ranking", key: "ttm_ranking" },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => (a.name < b.name ? -1 : 1),
  },
  {
    title: "TTM-Punkte",
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
  {
    title: "Anz. Runden",
    dataIndex: "total_rounds_played",
    key: "total_rounds_played",
    sorter: (a, b) => a.total_rounds_played - b.total_rounds_played,
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
        rowKey={"name"}
        pagination={{ defaultPageSize: 20 }}
        expandable={{
          expandedRowRender: (record) => (
            <Table<IndividualResult>
              dataSource={record.individual_results}
              columns={individualResultsColumns}
              rowKey={"tournament_name"}
              pagination={false}
            />
          ),
          rowExpandable: () => true,
        }}
      />
    </>
  );
};

export default RankingsTable;
