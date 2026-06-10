import React from "react";
import { useEqStats } from "../game/hooks/useEqStats";

export const EqStats: React.FC = () => {
  const eqStats = useEqStats();

  return (
    <div style={{ width: 200, height: 120, textAlign: 'left' }}>
      {Object.entries(eqStats).map(([stat, value], index) => (
        <div key={index}>{`${stat}: ${value}`}</div>
      ))}
    </div>
  );
};
