import React, { useCallback, useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd";
import NameSearch from "./NameSearch";
import "../styles/table.css";
import { TeamTournamentRankingsData } from "../hooks/useTeamTournamentRankingsData";
import TeamTournamentResultTable from "./TeamTournamentResultTable";

const columns: ColumnsType<TeamTournamentRankingsData> = [
  { title: "Ranking", dataIndex: "ranking" },
  {
    title: "Team",
    dataIndex: "team_ID",
  },
  {
    title: "Punkte",
    render: (value) => value.toFixed(2),
    dataIndex: "total_points",
    sorter: (a, b) => a.total_points - b.total_points,
    defaultSortOrder: "descend",
  },
  {
    title: "#Turniere",
    dataIndex: "nr_tournaments",
    sorter: (a, b) => a.nr_tournaments - b.nr_tournaments,
    render: (value) => `${value}/3`,
  },
];

const TeamTournamentRankingsTable = ({
  dataSource,
  loading,
}: {
  dataSource: TeamTournamentRankingsData[];
  loading: boolean;
}) => {
  const [results, setResults] = useState<TeamTournamentRankingsData[]>([]);

  const onChange = useCallback((data: TeamTournamentRankingsData[]) => {
    setResults(data);
  }, []);

  useEffect(() => {
    onChange(dataSource);
  }, [dataSource]);

  // @ts-ignore
  return (
    <>
      <div style={{ width: 500, marginBottom: 20 }}>
        <NameSearch
          fullDataSet={dataSource}
          setResults={onChange}
          searchKey={"team_ID"}
          placeholder={"Team Name suchen"}
        />
      </div>
      <Table<TeamTournamentRankingsData>
        dataSource={results}
        scroll={{ x: true }}
        columns={columns}
        loading={loading}
        rowKey={"team_ID"}
        pagination={{
          pageSize: 25,
          showSizeChanger: false,
        }}
        expandable={{
          expandedRowRender: (record) => (
            <div style={{ maxWidth: 650, overflow: "scroll" }}>
              <TeamTournamentResultTable
                dataSource={record.all_results}
                individualResults={record.individual_results}
              />
            </div>
          ),
          rowExpandable: () => true,
        }}
      />
    </>
  );
};

export default TeamTournamentRankingsTable;
