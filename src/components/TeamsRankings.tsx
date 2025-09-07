import React, { useCallback } from "react";
import useTeamsRankingsData from "../hooks/useTeamsRankingsData";
import { Country } from "../utils/constants";
import YearTabs from "./YearTabs";
import TeamsRankingsTable from "./TeamsRankingsTable";
import useTeamIconsData from "../hooks/useTeamIconsData";

const TeamsRanking = ({
  years,
  country,
}: {
  years: string[];
  country: Country;
}) => {
  const { fetchRankingsData, data, loading } = useTeamsRankingsData();
  const { fetchTeamIcons, data: teamIconsData } = useTeamIconsData();

  const fetchData = useCallback(
    (year: string) => {
      fetchRankingsData({ year, country });
      fetchTeamIcons();
    },
    [fetchRankingsData, country, fetchTeamIcons]
  );
  return (
    <YearTabs years={years} fetchData={fetchData}>
      <TeamsRankingsTable
        dataSource={data}
        loading={loading}
        teamIconsData={teamIconsData}
      />
    </YearTabs>
  );
};

export default TeamsRanking;
