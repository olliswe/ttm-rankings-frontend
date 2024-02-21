import GermanRankings from "./pages/GermanRankings";
import AustrianRankings from "./pages/AustrianRankings";

const App = () => {
  const query = new URLSearchParams(window.location.search);
  const country = query.get("country");

  if (country === "austria") {
    return <AustrianRankings />;
  }

  return <GermanRankings />;
};

export default App;
