import React from "react";
import { Card, Avatar, Typography, Tag, Space, Divider } from "antd";
import {
  UserOutlined,
  TrophyOutlined,
  StarOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { PlayerDetailsData } from "../hooks/usePlayerDetails";
import "../styles/player-details-card.css";
import ConditionalWrapper from "./ConditionalWrapper";

const { Title, Text } = Typography;

const PlayerDetailsCard = ({
  data,
  team,
  teamIcon,
  teamUrl,
}: {
  data: PlayerDetailsData;
  team: string;
  teamIcon: string;
  teamUrl: string;
}) => {
  return (
    <Card
      style={{ width: 300, margin: "20px 0" }}
      cover={
        <div
          style={{
            textAlign: "center",
            padding: "20px 0",
            background: "#efefef",
            borderRadius: "8px 8px 0 0",
          }}
        >
          <Avatar
            size={80}
            style={{ backgroundColor: "#f8f8f8" }}
            className="avatar"
            {...(teamIcon ? { src: teamIcon } : { icon: <UserOutlined /> })}
          />
        </div>
      }
    >
      <div style={{ textAlign: "center" }}>
        <Title level={3} style={{ margin: "10px 0" }}>
          {data.display_name}
        </Title>

        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          <div>
            <TrophyOutlined style={{ color: "#faad14", marginRight: 8 }} />
            <Text strong style={{ fontSize: 18 }}>
              Ranking: #{data.ranking_position}
            </Text>
          </div>

          <div>
            <StarOutlined style={{ color: "#52c41a", marginRight: 8 }} />
            <Text strong>Total Points: {data?.total_points?.toFixed(2)}</Text>
          </div>

          <div>
            <TeamOutlined style={{ color: "#1a55c4", marginRight: 8 }} />
            <ConditionalWrapper
              condition={!!teamUrl}
              wrapper={(children) => (
                <a
                  href={teamUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#1a55c4", textDecoration: "underline" }}
                >
                  {children}
                </a>
              )}
            >
              <span style={{ fontWeight: "bold" }}>Team: {team}</span>
            </ConditionalWrapper>
          </div>
        </Space>

        <Divider />

        <Space wrap>
          {data.is_active && <Tag color="blue">Active Player</Tag>}
          {data.ranking_position <= 12 && <Tag color="gold">Top 12</Tag>}
        </Space>
      </div>
    </Card>
  );
};

export default PlayerDetailsCard;
