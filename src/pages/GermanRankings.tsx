import React, { useState } from "react";
import { TeamOutlined, UserOutlined, ReadOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import GermanTeamRankings from "./GermanTeamRankings";
import SinglesRanking from "../SinglesRanking";
import { Country } from "../constants";
import GermanFactionRankings from "./GermanFactionRankings";

const items = [
  {
    label: "Individuelle Rangliste",
    key: "individual",
    icon: <UserOutlined />,
  },
  {
    label: "Club Rangliste",
    key: "teams",
    icon: <TeamOutlined />,
  },
  {
    label: "Faction Rangliste",
    key: "faction",
    icon: <ReadOutlined />,
  },
];

const GermanRankings: React.FC = () => {
  const [current, setCurrent] = useState("individual");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <div>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <div style={{ paddingTop: 8, paddingLeft: 16 }}>
        {current === "individual" && (
          <SinglesRanking
            years={["2025", "2024", "2023", "2022", "2021"]}
            country={Country.Germany}
          />
        )}
        {current === "teams" && <GermanTeamRankings />}
        {current === "faction" && <GermanFactionRankings />}
      </div>
    </div>
  );
};

export default GermanRankings;
