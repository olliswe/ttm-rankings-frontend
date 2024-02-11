import React, { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd";
import { IndividualResult, RankingsData } from "./useRankingsData";
import NameSearch from "./NameSearch";
import "./table.css";
import clsx from "clsx";

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

const isResultCounted = ({
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
  // { title: "Anz. Runden", dataIndex: "rounds", key: "rouns" },
  {
    title: "Fraktion",
    key: "faction",
    dataIndex: "faction",
  },
  // {
  //   title: "Spielgröße",
  //   render: (value) => `${value}pts`,
  //   dataIndex: "battle_size",
  // },
  {
    title: "Team",
    dataIndex: "team",
    key: "team",
    render: (value) => <div style={{ width: 150 }}>{value}</div>,
  },
];

const columns: ColumnsType<RankingsData> = [
  { title: "Ranking", dataIndex: "ttm_ranking", key: "ttm_ranking" },
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
              <Table<IndividualResult>
                dataSource={record.all_results || record.individual_results}
                columns={individualResultsColumns}
                rowKey={"tournament_name"}
                pagination={false}
                rowClassName={(result) =>
                  clsx(
                    result.tournament_id && "clickable",
                    !isResultCounted({
                      individualResults: record.individual_results,
                      result: result,
                    }) && "result-not-counted"
                  )
                }
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
