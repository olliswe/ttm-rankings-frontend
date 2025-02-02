import React from "react";
import SinglesRanking from "../SinglesRanking";
import { Country } from "../constants";

const GermanRankings = () => {
  return <SinglesRanking years={["2025", "2024"]} country={Country.Austria} />;
};

export default GermanRankings;
