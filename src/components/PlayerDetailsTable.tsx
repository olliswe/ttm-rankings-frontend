import React from "react";
import IndividualResultTable from "./IndividualResultTable";
import clsx from "clsx";
import { isResultCounted } from "./SinglesRankingsTable";
import { PlayerDetailsData } from "../hooks/usePlayerDetails";

const PlayerDetailsTable = ({ data }: { data: PlayerDetailsData }) => {
  return (
    <IndividualResultTable
      dataSource={data.all_results || data.individual_results}
      rowClassName={(result) =>
        clsx(
          result.tournament_id && "clickable",
          !isResultCounted({
            individualResults: data.individual_results,
            result: result,
          }) && "result-not-counted",
        )
      }
    />
  );
};

export default PlayerDetailsTable;
