import React, { useCallback, useEffect, useMemo } from "react";
import usePlayerDetails from "../hooks/usePlayerDetails";
import YearTabs from "../components/YearTabs";
import { useParams } from "react-router-dom";
import PlayerDetailsCard from "../components/PlayerDetailsCard";
import PlayerDetailsTable from "../components/PlayerDetailsTable";
import useTeamIconsData from "../hooks/useTeamIconsData";

const PlayerDetailsPage = () => {
  const { fetchPlayerDetailsData, data, loading } = usePlayerDetails();
  const { playerIdentifier } = useParams<{ playerIdentifier: string }>();

  const fetchData = useCallback(
    (year: string) => {
      if (!playerIdentifier) {
        return;
      }
      fetchPlayerDetailsData({ year, playerIdentifier });
    },
    [fetchPlayerDetailsData],
  );

  const { fetchTeamIcons, data: teamIconsData } = useTeamIconsData();

  useEffect(() => {
    fetchTeamIcons();
  }, []);

  const { team, teamIcon } = useMemo(() => {
    const team =
      data?.individual_results.find((result) => !!result.best_team)
        ?.best_team || "";
    if (!team) {
      return { team: "", teamIcon: "" };
    }
    return {
      team,
      teamIcon:
        teamIconsData.find(
          (icon) => icon?.Team?.toLowerCase() === String(team)?.toLowerCase(),
        )?.url || "",
    };
  }, [teamIconsData, data]);

  const renderContent = () => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (data) {
      return (
        <>
          <PlayerDetailsCard data={data} team={team} teamIcon={teamIcon} />
          <div style={{ maxWidth: 720, maxHeight: 1500, overflow: "scroll" }}>
            <PlayerDetailsTable data={data} />
          </div>
        </>
      );
    }
    return <div>No data available.</div>;
  };

  return (
    <div>
      <YearTabs
        years={["2025", "2024", "2023"]}
        fetchData={fetchData}
        customStyle={{ maxWidth: "unset" }}
      >
        {renderContent()}
      </YearTabs>
    </div>
  );
};

export default PlayerDetailsPage;
