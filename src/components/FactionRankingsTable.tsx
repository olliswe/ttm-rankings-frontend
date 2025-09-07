import React, { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd";
import NameSearch from "./NameSearch";
import "../styles/table.css";
import IndividualResultTable from "./IndividualResultTable";
import { FactionIndividualRanking } from "../hooks/useFactionRankingsData";
import clsx from "clsx";
import { isResultCounted } from "./SinglesRankingsTable";

const columns: ColumnsType<FactionIndividualRanking> = [
  { title: "Ranking", dataIndex: "ttm_ranking" },
  {
    title: "Name",
    dataIndex: "display_name",
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
    dataIndex: "games",
    render: (value, record) => `${record.all_results.length}/5`,
  },
];

const FactionRankingsTable = ({
  dataSource,
}: {
  dataSource: FactionIndividualRanking[];
}) => {
  const [results, setResults] = useState<FactionIndividualRanking[]>([]);

  useEffect(() => {
    setResults(dataSource);
  }, [dataSource]);

  // @ts-ignore
  return (
    <>
      <div style={{ width: 500, marginBottom: 20, marginTop: 20 }}>
        <NameSearch
          fullDataSet={dataSource}
          setResults={setResults}
          searchKey={"display_name"}
          placeholder={"Spieler*in suchen"}
        />
      </div>
      <Table<FactionIndividualRanking>
        dataSource={results}
        scroll={{ x: true }}
        columns={columns}
        rowKey={"identifier"}
        pagination={{
          pageSize: 25,
          showSizeChanger: false,
        }}
        expandable={{
          expandedRowRender: (record) => (
            <div style={{ maxWidth: 650, overflow: "scroll" }}>
              <IndividualResultTable
                dataSource={record.all_results}
                rowClassName={(result) =>
                  clsx(
                    result.tournament_id && "clickable",
                    !isResultCounted({
                      individualResults: record.results,
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

export default FactionRankingsTable;
