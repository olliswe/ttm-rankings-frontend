import GermanRankings from "./GermanRankings";
import AustrianRankings from "./AustrianRankings";

const RankingsRoot = () => {
  const query = new URLSearchParams(window.location.search);
  const country = query.get("country");

  if (country === "austria") {
    return <AustrianRankings />;
  }

  return <GermanRankings />;
};

export default RankingsRoot;
