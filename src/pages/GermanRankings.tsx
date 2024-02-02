import React from "react";
import SinglesRanking from "../SinglesRanking";
import { Country } from "../constants";

const GermanRankings = () => {
  return (
    <SinglesRanking
      years={["2024", "2023", "2022", "2021"]}
      country={Country.Germany}
    />
  );
};

export default GermanRankings;
