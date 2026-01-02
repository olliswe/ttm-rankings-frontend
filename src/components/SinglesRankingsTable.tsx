import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd";
import { IndividualResult, RankingsData } from "../hooks/useRankingsData";
import NameSearch from "./NameSearch";
import "../styles/table.css";
import clsx from "clsx";
import IndividualResultTable from "./IndividualResultTable";
import { GoldenTicketData } from "../hooks/useGoldenTicketData";
import { TeamIconData } from "../hooks/useTeamIconsData";
import { UserOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { ColumnType } from "antd/es/table/interface";
import ConditionalWrapper from "./ConditionalWrapper";

type ModRankingsData = RankingsData & {
  hasGoldenTicket: boolean;
  teamUrl?: string;
};

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
  goldenTicketData: GoldenTicketData[],
) => {
  return goldenTicketData.some((x) => x.identifier === identifier);
};

const columns: ColumnsType<ModRankingsData> = [
  { title: "#", dataIndex: "ttm_ranking", key: "ttm_ranking" },

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
            alt="Golden ticket"
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
    title: () => (
      <div style={{ display: "flex", alignItems: "center" }}>
        Elo{"  "}
        <a
          href="https://www.stat-check.com/elo"
          target="_blank"
          style={{ width: 21, height: 21 }}
          rel="noreferrer"
        >
          <img
            src="https://images.squarespace-cdn.com/content/v1/62c4a96d909c007e86c1000d/7122a393-cd81-45de-aaec-88fd9c7c32a9/resized_logo.png"
            alt="SC"
            style={{ width: 21, height: 21 }}
          />
        </a>
      </div>
    ),
    render: (value) => (value ? value.toFixed(0) : "N/A"),
    dataIndex: "elo_ranking",
    sorter: (a, b) => (a?.elo_ranking ?? 0) - (b.elo_ranking ?? 0),
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
          <Tooltip title={record.team} placement="top">
            <ConditionalWrapper
              condition={!!record.teamUrl}
              wrapper={(children) => (
                <a target="_blank" rel="noreferrer" href={record.teamUrl}>
                  {children}
                </a>
              )}
            >
              <img
                src={record.teamIcon}
                style={{ maxWidth: 50, maxHeight: 30 }}
              />
            </ConditionalWrapper>
          </Tooltip>
        ) : (
          record.team
        )}
      </div>
    ),
  },
];

const profileColumn: ColumnType<ModRankingsData> = {
  title: "",
  dataIndex: "profile_url",
  key: "profile_url",
  render: (value: string) =>
    value ? (
      <Tooltip title="Profil öffnen" placement="top">
        <a href={value} target="__blank">
          <UserOutlined style={{ fontSize: 16, color: "#1890ff" }} />
        </a>
      </Tooltip>
    ) : null,
  width: "10px",
  align: "center",
};

const SinglesRankingsTable = ({
  dataSource,
  loading,
  goldenTicketData,
  teamIconsData,
  showProfile,
}: {
  dataSource: RankingsData[];
  loading: boolean;
  goldenTicketData: GoldenTicketData[];
  teamIconsData: TeamIconData[];
  showProfile: boolean;
}) => {
  const [results, setResults] = useState<ModRankingsData[]>([]);

  const onChange = useCallback(
    (data: RankingsData[]) => {
      setResults(
        data.map((x) => {
          const team =
            x.individual_results.find((result) => !!result.best_team)
              ?.best_team || "";
          const teamIconData = team
            ? teamIconsData.find(
                (icon) =>
                  icon?.team?.toLowerCase() === String(team)?.toLowerCase(),
              )
            : undefined;
          return {
            ...x,
            hasGoldenTicket: hasGoldenTicket(x.identifier, goldenTicketData),
            team,
            teamIcon: teamIconData?.image_url,
            teamUrl: teamIconData?.link_url,
          };
        }),
      );
    },
    [goldenTicketData, teamIconsData],
  );

  useEffect(() => {
    onChange(dataSource);
  }, [dataSource, onChange]);

  const finalColumns = useMemo(() => {
    if (showProfile) {
      return [...columns, profileColumn];
    }
    return columns;
  }, [showProfile]);

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
        columns={finalColumns}
        loading={loading}
        rowKey={"identifier"}
        pagination={{
          pageSize: 25,
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
                    }) && "result-not-counted",
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
