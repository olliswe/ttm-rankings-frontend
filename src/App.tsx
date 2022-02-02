import React, { useEffect } from "react";
import "antd/dist/antd.css";
import useRankingsData from "./useRankingsData";
import RankingsTable from "./RankingsTable";

const App = () => {
  const { fetchRankingsData, data, loading } = useRankingsData();

  useEffect(() => {
    fetchRankingsData();
  }, [fetchRankingsData]);

  return (
    <div style={{ margin: 20 }}>
      <RankingsTable loading={loading} dataSource={data} />
    </div>
  );
};

export default App;
