import { useCallback, useState } from "react";
import { API_URL } from "./constants";
import { IndividualResult } from "./useRankingsData";

export interface TeamRanking {
  ranking: number;
  points: number;
  players: number;
  tournaments: number;
  games: number;
  all_results: IndividualResult[];
  team: string;
  best_results: IndividualResult[];
  teamIcon?: string;
}

const useTeamsRankingsData = () => {
  const [data, setData] = useState<TeamRanking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchRankingsData = useCallback(
    async ({ year, country }: { year: string; country: string }) => {
      setLoading(true);
      setError(false);
      try {
        const json = await fetch(
          `${API_URL}/teams-rankings-data?year=${year}&country=${country}`
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

export default useTeamsRankingsData;
