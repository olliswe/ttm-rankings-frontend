import { useCallback, useState } from "react";
import { API_URL } from "../utils/constants";
import { RankingsData } from "./useRankingsData";

export interface PlayerDetailsData extends RankingsData {
  ranking_position: number;
  is_active: boolean;
}

const useRankingsData = () => {
  const [data, setData] = useState<PlayerDetailsData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchPlayerDetailsData = useCallback(
    async ({
      year,
      country,
      playerIdentifier,
    }: {
      year?: string;
      country?: string;
      playerIdentifier: string;
    }) => {
      setLoading(true);
      setError(false);
      const currentYear = new Date().getFullYear();
      try {
        const json = await fetch(
          `${API_URL}/player-details/${playerIdentifier}?year=${year || currentYear}&country=${country || "germany"}`,
        );
        const res = await json.json();
        setData(res);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { error, loading, data, fetchPlayerDetailsData };
};

export default useRankingsData;
