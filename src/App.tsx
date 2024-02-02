import "antd/dist/antd.css";
import { Route, Routes } from "react-router-dom";
import GermanRankings from "./pages/GermanRankings";
import AustrianRankings from "./pages/AustrianRankings";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<GermanRankings />} />
      <Route path="/austria" element={<AustrianRankings />} />
    </Routes>
  );
};

export default App;
