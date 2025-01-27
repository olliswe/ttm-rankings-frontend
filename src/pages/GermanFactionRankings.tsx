import React from "react";
import { Country } from "../constants";
import FactionRankings from "../FactionRankings";

const GermanFactionRankings = () => {
  return (
    <FactionRankings
      years={["2025", "2024", "2023"]}
      country={Country.Germany}
    />
  );
};

export default GermanFactionRankings;
