import React, { useEffect, useState } from "react";
import { Country } from "./constants";
import useRankingsData from "./useRankingsData";
import { Tabs } from "antd";
import RankingsTable from "./RankingsTable";

const { TabPane } = Tabs;

const SinglesRanking = ({
  years,
  country,
}: {
  years: string[];
  country: Country;
}) => {
  const [activeKey, setActiveKey] = useState(years[0]);
  const { fetchRankingsData, data, loading } = useRankingsData();

  useEffect(() => {
    fetchRankingsData({ year: activeKey, country });
  }, [fetchRankingsData, activeKey]);

  return (
    <div style={{ maxWidth: 720, maxHeight: 3000, overflow: "scroll" }}>
      <Tabs activeKey={activeKey} onChange={setActiveKey}>
        {years.map((year) => (
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

export default SinglesRanking;
