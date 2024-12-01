import React, { useCallback, useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd";
import { IndividualResult, RankingsData } from "./useRankingsData";
import NameSearch from "./NameSearch";
import "./table.css";
import clsx from "clsx";
import IndividualResultTable from "./components/IndividualResultTable";
import { GoldenTicketData } from "./useGoldenTicketData";
import { TeamIconData } from "./useTeamIconsData";

type ModRankingsData = RankingsData & { hasGoldenTicket: boolean };

export const isResultCounted = ({
  individualResults,
  result,
}: {
  individualResults: IndividualResult[];
  result: IndividualResult;
}) => {
  if (!result.result_id) {
    return true;
  }
  return individualResults.find((x) => x.result_id === result.result_id);
};

const hasGoldenTicket = (
  identifier: string,
  goldenTicketData: GoldenTicketData[]
) => {
  return goldenTicketData.some((x) => x.identifier === identifier);
};

const columns: ColumnsType<ModRankingsData> = [
  { title: "Ranking", dataIndex: "ttm_ranking", key: "ttm_ranking" },
  {
    title: "Name",
    dataIndex: "display_name",
    key: "display_name",
    width: "200px",
    sorter: (a, b) => (a.display_name < b.display_name ? -1 : 1),
    render: (value, record) => (
      <span>
        {value}
        {record.hasGoldenTicket && (
          <img
            src="https://breakingheads.de/wp-content/uploads/2024/09/GoldenTicket.png"
            style={{ marginLeft: 8, height: 10 }}
          />
        )}
      </span>
    ),
  },
  {
    title: "Punkte",
    render: (value) => value.toFixed(2),
    dataIndex: "total_points",
    sorter: (a, b) => a.total_points - b.total_points,
    defaultSortOrder: "descend",
  },
  {
    title: "Turniere",
    render: (_, record) =>
      `${
        record.all_results?.length ?? record.individual_results?.length ?? 0
      }/5`,
    key: "total_nr_tournaments",
  },
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
    key: "team",
    render: (value, record) => record.team,
  },
];

const SinglesRankingsTable = ({
  dataSource,
  loading,
  goldenTicketData,
  teamIconsData,
}: {
  dataSource: RankingsData[];
  loading: boolean;
  goldenTicketData: GoldenTicketData[];
  teamIconsData: TeamIconData[];
}) => {
  const [results, setResults] = useState<ModRankingsData[]>([]);

  const onChange = useCallback(
    (data: RankingsData[]) => {
      setResults(
        data.map((x) => {
          const team =
            x.individual_results.find((result) => !!result.team)?.team || "";
          return {
            ...x,
            hasGoldenTicket: hasGoldenTicket(x.identifier, goldenTicketData),
            team,
            teamIcon: teamIconsData.find(
              (icon) => icon.Team?.toLowerCase() === team?.toLowerCase()
            )?.url,
          };
        })
      );
    },
    [goldenTicketData, teamIconsData]
  );

  useEffect(() => {
    onChange(dataSource);
  }, [dataSource, onChange]);

  return (
    <>
      <div style={{ width: 500, marginBottom: 20 }}>
        <NameSearch
          fullDataSet={dataSource}
          setResults={onChange}
          searchKey={"display_name"}
          placeholder={"Spieler*in Name suchen"}
        />
      </div>
      <Table<ModRankingsData>
        dataSource={results}
        scroll={{ x: true }}
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
              <IndividualResultTable
                dataSource={record.all_results || record.individual_results}
                rowClassName={(result) =>
                  clsx(
                    result.tournament_id && "clickable",
                    !isResultCounted({
                      individualResults: record.individual_results,
                      result: result,
                    }) && "result-not-counted"
                  )
                }
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
