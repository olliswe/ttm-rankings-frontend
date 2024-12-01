import React, { useEffect, useState } from "react";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const YearTabs = ({
  years,
  fetchData,
  children,
}: {
  years: string[];
  fetchData: (year: string) => void;
  children: React.ReactNode;
}) => {
  const [activeKey, setActiveKey] = useState(years[0]);

  useEffect(() => {
    fetchData(activeKey);
  }, [activeKey, fetchData]);

  return (
    <div style={{ maxWidth: 720, maxHeight: 2200, overflow: "scroll" }}>
      <Tabs activeKey={activeKey} onChange={setActiveKey}>
        {years.map((year) => (
          <TabPane tab={year} key={year}>
            {activeKey === year && children}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default YearTabs;
