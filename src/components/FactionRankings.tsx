import React, { useCallback, useMemo } from "react";
import { Country } from "../utils/constants";
import YearTabs from "./YearTabs";
import useFactionRankingsData, {
  FactionRanking,
} from "../hooks/useFactionRankingsData";
import { Select } from "antd";
import FactionRankingsTable from "./FactionRankingsTable";

const FactionRankingSelector = ({ data }: { data: FactionRanking }) => {
  const factionsList = useMemo(() => Object.keys(data).sort(), [data]);
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
        style={{ width: 250 }}
      />
      <FactionRankingsTable dataSource={factionData} />
    </div>
  );
};

const FactionRankings = ({
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

export default FactionRankings;
