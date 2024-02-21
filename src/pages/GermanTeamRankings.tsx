import React from "react";
import TeamsRankings from "../TeamsRankings";
import { Country } from "../constants";

const GermanTeamRankings = () => {
  return <TeamsRankings years={["2024"]} country={Country.Germany} />;
};

export default GermanTeamRankings;
