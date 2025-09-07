import { useCallback, useState } from "react";
import { API_URL } from "../utils/constants";

export interface GoldenTicketData {
  identifier: string;
}

const useGoldenTicketData = () => {
  const [data, setData] = useState<GoldenTicketData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchGoldenTicketData = useCallback(
    async ({ year }: { year: string }) => {
      setLoading(true);
      setError(false);
      try {
        const json = await fetch(
          `${API_URL}/golden-ticket-recipients?year=${year}`
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

  return { error, loading, data, fetchGoldenTicketData };
};

export default useGoldenTicketData;
