import React, {useCallback} from "react";
import {Country} from "./constants";
import YearTabs from "./components/YearTabs";
import useTeamTournamentRankingsData from "./useTeamTournamentRankingsData";
import TeamTournamentRankingsTable from "./TeamTournamentRankingsTable";

const TeamTournamentRankings = ({
  years,
  country,
}: {
  years: string[];
  country: Country;
}) => {
  const { fetchRankingsData, data, loading } = useTeamTournamentRankingsData();

  const fetchData = useCallback(
    (year: string) => {
      fetchRankingsData({ year, country });
    },
    [fetchRankingsData, country]
  );

  return (
    <YearTabs years={years} fetchData={fetchData}>
      <TeamTournamentRankingsTable dataSource={data} loading={loading} />
    </YearTabs>
  );
};

export default TeamTournamentRankings;
