import React, {useCallback} from "react";
import {Country} from "./constants";
import useRankingsData from "./useRankingsData";
import SinglesRankingsTable from "./SinglesRankingsTable";
import YearTabs from "./components/YearTabs";
import useGoldenTicketData from "./useGoldenTicketData";

const SinglesRanking = ({
  years,
  country,
}: {
  years: string[];
  country: Country;
}) => {
  const { fetchRankingsData, data, loading } = useRankingsData();

  const { fetchGoldenTicketData, data: goldenTicketData} =
    useGoldenTicketData();

  const fetchData = useCallback(
    (year: string) => {
      fetchGoldenTicketData({ year });
      fetchRankingsData({ year, country });
    },
    [fetchRankingsData, country, fetchGoldenTicketData]
  );

  return (
    <YearTabs years={years} fetchData={fetchData}>
      <SinglesRankingsTable dataSource={data} loading={loading} goldenTicketData={goldenTicketData}/>
    </YearTabs>
  );
};

export default SinglesRanking;
