import {useCallback, useState} from "react";
import {API_URL} from "../utils/constants";

export interface TeamTournamentResult {
  team_display_name: string;
  bcp_team_ID: string;
  tournament_name: string;
  date: string;
  tournament_site: string;
  tournament_ID: string;
  total_players: number;
  players_per_team: number;
  total_teams: number;
  placing: number;
  wins: number;
  games: number;
  points: number;
  max_points: number;
  meta: string;
}

export interface TeamTournamentRankingsData {
  team_ID: string;
  total_points: number;
  nr_tournaments: number;
  total_games_played: number;
  individual_results: TeamTournamentResult[];
  all_results: TeamTournamentResult[];
  ranking: number;
}

const useTeamTournamentRankingsData = () => {
  const [data, setData] = useState<TeamTournamentRankingsData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchRankingsData = useCallback(
    async ({ year, country }: { year: string; country: string }) => {
      setLoading(true);
      setError(false);
      try {
        const json = await fetch(
          `${API_URL}/team-tournament-rankings-data?year=${year}&country=${country}`
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

export default useTeamTournamentRankingsData;
