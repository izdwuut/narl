import React from "react";
import { usePlayer } from "../game/hooks/usePlayer";

export const Exp: React.FC = () => {
  const { exp } = usePlayer();

  return <div>exp: {exp}</div>;
};
