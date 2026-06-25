import React from "react";
import { useStats } from "../game/hooks/useStats";

export const PlayerStats: React.FC = () => {
  const { playerStats } = useStats();

  return (
    <div style={{ width: 200, height: 120, textAlign: "left" }}>
      {Object.entries(playerStats).map(([stat, value], index) => (
        <div key={index}>{`${stat}: ${value}`}</div>
      ))}
    </div>
  );
};
