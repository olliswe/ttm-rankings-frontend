import React, { useCallback } from "react";
import { Country } from "./constants";
import useRankingsData from "./useRankingsData";
import SinglesRankingsTable from "./SinglesRankingsTable";
import YearTabs from "./components/YearTabs";

const SinglesRanking = ({
  years,
  country,
}: {
  years: string[];
  country: Country;
}) => {
  const { fetchRankingsData, data, loading } = useRankingsData();

  const fetchData = useCallback(
    (year: string) => {
      fetchRankingsData({ year, country });
    },
    [fetchRankingsData, country]
  );

  return (
    <YearTabs years={years} fetchData={fetchData}>
      <SinglesRankingsTable dataSource={data} loading={loading} />
    </YearTabs>
  );
};

export default SinglesRanking;
