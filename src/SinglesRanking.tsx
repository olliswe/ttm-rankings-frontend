import React, { useCallback } from "react";
import { Country } from "./constants";
import useRankingsData from "./useRankingsData";
import SinglesRankingsTable from "./SinglesRankingsTable";
import YearTabs from "./components/YearTabs";
import useGoldenTicketData from "./useGoldenTicketData";
import useTeamIconsData from "./useTeamIconsData";

const SinglesRanking = ({
  years,
  country,
}: {
  years: string[];
  country: Country;
}) => {
  const { fetchRankingsData, data, loading } = useRankingsData();

  const { fetchGoldenTicketData, data: goldenTicketData } =
    useGoldenTicketData();

  const { fetchTeamIcons, data: teamIconsData } = useTeamIconsData();

  const fetchData = useCallback(
    (year: string) => {
      fetchGoldenTicketData({ year });
      fetchRankingsData({ year, country });
      fetchTeamIcons();
    },
    [fetchRankingsData, country, fetchGoldenTicketData]
  );

  return (
    <YearTabs years={years} fetchData={fetchData}>
      <SinglesRankingsTable
        dataSource={data}
        loading={loading}
        goldenTicketData={goldenTicketData}
        teamIconsData={teamIconsData}
      />
    </YearTabs>
  );
};

export default SinglesRanking;
