import React, { useEffect } from "react";
import Table from "antd";
import "antd/dist/antd.css";
import useRankingsData from "./useRankingsData";

const App = () => {
  const { fetchRankingsData } = useRankingsData();

  useEffect(() => {
    fetchRankingsData();
  }, [fetchRankingsData]);
  return <div></div>;
};

export default App;
