import "antd/dist/antd.css";
import GermanRankings from "./pages/GermanRankings";
import AustrianRankings from "./pages/AustrianRankings";
import GermanTeamRankings from "./pages/GermanTeamRankings";

const App = () => {
  const query = new URLSearchParams(window.location.search);
  const country = query.get("country");
  const rankingsType = query.get("type");

  if (rankingsType === "teams") {
    return <GermanTeamRankings />;
  }

  if (country === "austria") {
    return <AustrianRankings />;
  }

  return <GermanRankings />;
};

export default App;
