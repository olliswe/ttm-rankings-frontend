import { useCallback, useState } from "react";
import { API_URL } from "./constants";

const useRankingsData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchRankingsData = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const json = await fetch(`${API_URL}/player-data`);
      const res = await json.json();
      const data = res.data;
      console.log({ data });
    } catch (error) {
      setError(true);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { error, loading, data, fetchRankingsData };
};

export default useRankingsData;
