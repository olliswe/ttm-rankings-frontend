import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import useRankingsData from "./useRankingsData";
import { Tabs } from "antd";
import RankingsTable from "./RankingsTable";

const { TabPane } = Tabs;

const IMPLEMENTED_YEARS = ["2024", "2023", "2022", "2021"];
const PRE_YEARS = ["2019"];

const App = () => {
  const [activeKey, setActiveKey] = useState(IMPLEMENTED_YEARS[0]);
  const { fetchRankingsData, data, loading } = useRankingsData();

  useEffect(() => {
    fetchRankingsData({ year: activeKey });
  }, [fetchRankingsData, activeKey]);

  return (
    <div style={{ maxWidth: 720, maxHeight: 3000, overflow: "scroll" }}>
      <Tabs activeKey={activeKey} onChange={setActiveKey}>
        {IMPLEMENTED_YEARS.map((year) => (
          <TabPane tab={year} key={year}>
            {activeKey === year && (
              <RankingsTable loading={loading} dataSource={data} />
            )}
          </TabPane>
        ))}
        {PRE_YEARS.map((year) => (
          <TabPane tab={year} key={year}>
            {activeKey === year && "Daten werden noch eingefügt"}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default App;
