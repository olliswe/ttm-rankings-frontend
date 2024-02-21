import React, { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd";
import NameSearch from "./NameSearch";
import "./table.css";
import IndividualResultTable from "./components/IndividualResultTable";
import { TeamRanking } from "./useTeamsRankingsData";

const columns: ColumnsType<TeamRanking> = [
  { title: "Ranking", dataIndex: "ranking" },
  {
    title: "Team",
    dataIndex: "team",
  },
  {
    title: "Punkte",
    render: (value) => value.toFixed(2),
    dataIndex: "points",
    sorter: (a, b) => a.points - b.points,
    defaultSortOrder: "descend",
  },
  {
    title: "#Spieler",
    dataIndex: "players",
    render: (value) => `${value}/8`,
    sorter: (a, b) => a.players - b.players,
  },
  {
    title: "#Turniere",
    dataIndex: "tournaments",
    sorter: (a, b) => a.tournaments - b.tournaments,
  },
  {
    title: "#Spiele",
    dataIndex: "games",
  },
];

const SinglesRankingsTable = ({
  dataSource,
  loading,
}: {
  dataSource: TeamRanking[];
  loading: boolean;
}) => {
  const [results, setResults] = useState<TeamRanking[]>([]);

  useEffect(() => {
    setResults(dataSource);
  }, [dataSource]);

  // @ts-ignore
  return (
    <>
      <div style={{ width: 500, marginBottom: 20 }}>
        <NameSearch
          fullDataSet={dataSource}
          setResults={setResults}
          searchKey={"team"}
          placeholder={"Team Name suchen"}
        />
      </div>
      <Table<TeamRanking>
        dataSource={results}
        scroll={{ x: true }}
        columns={columns}
        loading={loading}
        rowKey={"team"}
        pagination={{
          pageSize: 50,
          showSizeChanger: false,
        }}
        expandable={{
          expandedRowRender: (record) => (
            <div style={{ maxWidth: 650, overflow: "scroll" }}>
              <IndividualResultTable
                dataSource={record.best_results}
                columns={[
                  {
                    title: "Name",
                    dataIndex: "display_name",
                  },
                ]}
              />
            </div>
          ),
          rowExpandable: () => true,
        }}
      />
    </>
  );
};

export default SinglesRankingsTable;
