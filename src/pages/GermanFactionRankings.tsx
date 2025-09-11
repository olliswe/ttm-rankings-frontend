import React from "react";
import { Country } from "../utils/constants";
import FactionRankings from "../components/FactionRankings";

const GermanFactionRankings = () => {
  return (
    <FactionRankings
      years={["2025", "2024", "2023"]}
      country={Country.Germany}
    />
  );
};

export default GermanFactionRankings;
