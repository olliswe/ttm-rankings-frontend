import React, { useCallback, useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd";
import NameSearch from "./NameSearch";
import "./table.css";
import IndividualResultTable from "./components/IndividualResultTable";
import { TeamRanking } from "./useTeamsRankingsData";
import { TeamIconData } from "./useTeamIconsData";

const columns: ColumnsType<TeamRanking> = [
  { title: "Ranking", dataIndex: "ranking" },
  {
    title: "",
    key: "teamIcon",
    width: 50,
    render: (value, record) => (
      <div
        style={{
          width: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {record.teamIcon ? (
          <img src={record.teamIcon} style={{ maxWidth: 50, maxHeight: 30 }} />
        ) : (
          ""
        )}
      </div>
    ),
  },
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

const TeamRankingsTable = ({
  dataSource,
  loading,
  teamIconsData,
}: {
  dataSource: TeamRanking[];
  teamIconsData: TeamIconData[];
  loading: boolean;
}) => {
  const [results, setResults] = useState<TeamRanking[]>([]);

  const onChange = useCallback(
    (data: TeamRanking[]) => {
      setResults(
        data.map((x) => ({
          ...x,
          teamIcon: teamIconsData.find((icon) => icon.Team?.toLowerCase() === x.team?.toLowerCase())?.url,
        }))
      );
    },
    [teamIconsData]
  );

  useEffect(() => {
    onChange(dataSource);
  }, [dataSource, onChange]);

  // @ts-ignore
  return (
    <>
      <div style={{ width: 500, marginBottom: 20 }}>
        <NameSearch
          fullDataSet={dataSource}
          setResults={onChange}
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

export default TeamRankingsTable;
