import React from "react";
import SinglesRanking from "../components/SinglesRanking";
import { Country } from "../utils/constants";

const GermanRankings = () => {
  return <SinglesRanking years={["2025", "2024"]} country={Country.Austria} />;
};

export default GermanRankings;
