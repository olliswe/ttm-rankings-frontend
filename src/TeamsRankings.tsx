import React, { useCallback } from "react";
import useTeamsRankingsData from "./useTeamsRankingsData";
import { Country } from "./constants";
import YearTabs from "./components/YearTabs";
import TeamsRankingsTable from "./TeamsRankingsTable";

const TeamsRanking = ({
  years,
  country,
}: {
  years: string[];
  country: Country;
}) => {
  const { fetchRankingsData, data, loading } = useTeamsRankingsData();

  const fetchData = useCallback(
    (year: string) => {
      fetchRankingsData({ year, country });
    },
    [fetchRankingsData, country]
  );
  return (
    <YearTabs years={years} fetchData={fetchData}>
      <TeamsRankingsTable dataSource={data} loading={loading} />
    </YearTabs>
  );
};

export default TeamsRanking;
