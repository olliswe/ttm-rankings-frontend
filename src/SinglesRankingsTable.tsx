import React, { useCallback, useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd";
import { IndividualResult, RankingsData } from "./useRankingsData";
import NameSearch from "./NameSearch";
import "./table.css";
import clsx from "clsx";
import IndividualResultTable from "./components/IndividualResultTable";
import { GoldenTicketData } from "./useGoldenTicketData";

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
    sorter: (a, b) => (a.display_name < b.display_name ? -1 : 1),
    render: (value, record) => `${value}${record.hasGoldenTicket ? " 🎟️" : ""}`,
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
    render: (value) => `${value}/5`,
    dataIndex: "nr_tournaments",
    key: "nr_tournaments",
    sorter: (a, b) => a.nr_tournaments - b.nr_tournaments,
  },
  {
    title: "Team",
    key: "team",
    render: (value, record) =>
      record.individual_results.find((x) => !!x.team)?.team || "",
  },
];

const SinglesRankingsTable = ({
  dataSource,
  loading,
  goldenTicketData,
}: {
  dataSource: RankingsData[];
  loading: boolean;
  goldenTicketData: GoldenTicketData[];
}) => {
  const [results, setResults] = useState<ModRankingsData[]>([]);

  const onChange = useCallback(
    (data: RankingsData[]) => {
      setResults(
        data.map((x) => ({
          ...x,
          hasGoldenTicket: hasGoldenTicket(x.identifier, goldenTicketData),
        }))
      );
    },
    [goldenTicketData]
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
