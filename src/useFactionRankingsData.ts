import { useCallback, useState } from "react";
import { API_URL } from "./constants";
import { IndividualResult } from "./useRankingsData";

interface FactionIndividualRanking {
  results: IndividualResult[];
  total_points: number;
  all_results: IndividualResult[];
  display_name: string;
  identifier: string;
  ttm_ranking: number;
}

export interface FactionRanking {
  [key: string]: FactionIndividualRanking[];
}
const useFactionRankingsData = () => {
  const [data, setData] = useState<FactionRanking>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchRankingsData = useCallback(
    async ({ year, country }: { year: string; country: string }) => {
      setLoading(true);
      setError(false);
      try {
        const json = await fetch(
          `${API_URL}/faction-rankings-data?year=${year}&country=${country}`
        );
        const res = await json.json();
        const data = res.data;
        setData(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { error, loading, data, fetchRankingsData };
};

export default useFactionRankingsData;
