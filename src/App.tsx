import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import useRankingsData from "./useRankingsData";
import { Tabs } from "antd";
import RankingsTable from "./RankingsTable";

const { TabPane } = Tabs;

const YEARS = ["2022", "2021"];

const App = () => {
  const [activeKey, setActiveKey] = useState(YEARS[0]);
  const { fetchRankingsData, data, loading } = useRankingsData();

  useEffect(() => {
    fetchRankingsData({ year: activeKey });
  }, [fetchRankingsData, activeKey]);

  return (
    <div style={{ maxWidth: 720, maxHeight: 3000, overflow: "scroll" }}>
      <Tabs activeKey={activeKey} onChange={setActiveKey}>
        {YEARS.map((year) => (
          <TabPane tab={year} key={year}>
            {activeKey === year && (
              <RankingsTable loading={loading} dataSource={data} />
            )}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default App;
