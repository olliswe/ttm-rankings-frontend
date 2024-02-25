import React, { useCallback, useMemo } from "react";
import { Country } from "./constants";
import YearTabs from "./components/YearTabs";
import useFactionRankingsData, {
  FactionRanking,
} from "./useFactionRankingsData";
import { Select } from "antd";

const FactionRankingSelector = ({ data }: { data: FactionRanking }) => {
  const factionsList = useMemo(() => Object.keys(data), [data]);
  const [selectedFaction, setSelectedFaction] = React.useState(factionsList[0]);

  const factionData = useMemo(
    () => data[selectedFaction],
    [data, selectedFaction]
  );

  return (
    <div>
      <Select
        options={factionsList.map((faction) => ({
          value: faction,
          label: faction,
        }))}
        value={selectedFaction}
        onChange={(value) => setSelectedFaction(value)}
      />
      ;
    </div>
  );
};

const FactionRanking = ({
  years,
  country,
}: {
  years: string[];
  country: Country;
}) => {
  const { fetchRankingsData, data, loading } = useFactionRankingsData();

  const fetchData = useCallback(
    (year: string) => {
      fetchRankingsData({ year, country });
    },
    [fetchRankingsData, country]
  );
  return (
    <YearTabs years={years} fetchData={fetchData}>
      {data && <FactionRankingSelector data={data} />}
    </YearTabs>
  );
};

export default FactionRanking;
