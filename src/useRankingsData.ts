import { useCallback, useState } from "react";
import { API_URL } from "./constants";

export interface IndividualResult {
  rounds: number;
  players: number;
  date: string;
  faction: string;
  placement: number;
  battle_size: number;
  city: string;
  best_team: string;
  tournament_name: string;
  tournament_type: string;
  ttm_points: number;
  tournament_id: string;
  wins: number;
  result_id?: string;
}

export interface RankingsData {
  display_name: string;
  identifier: string;
  total_points: number;
  nr_tournaments: number;
  total_rounds_played: number;
  individual_results: IndividualResult[];
  all_results?: IndividualResult[];
  ttm_ranking: number;
  team?: string;
  teamIcon?: string;
}

const useRankingsData = () => {
  const [data, setData] = useState<RankingsData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchRankingsData = useCallback(
    async ({ year, country }: { year: string; country: string }) => {
      setLoading(true);
      setError(false);
      try {
        const json = await fetch(
          `${API_URL}/player-data?year=${year}&country=${country}`
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

export default useRankingsData;
