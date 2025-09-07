import { useCallback, useState } from "react";
import { API_URL } from "../utils/constants";

export interface TeamIconData {
  Team: string;
  url: string;
}

const useTeamIconsData = () => {
  const [data, setData] = useState<TeamIconData[]>([]);

  const fetchTeamIcons = useCallback(async () => {
    try {
      const json = await fetch(`${API_URL}/team-icons`);
      const res = await json.json();
      const data = res.data;
      setData(data);
    } catch (error) {
      console.log("Error fetching team icons", error);
    }
  }, []);

  return { data, fetchTeamIcons };
};

export default useTeamIconsData;
