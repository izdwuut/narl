import { useContext } from "react";
import { GameContext } from "../state/context";
import { getPlayerEntity } from "../state/selectors/player";
import { getEqStats } from "../systems/stats/getEqStats";

export const useEqStats = () => {
  const { gameState } = useContext(GameContext);

  const eqStats = getEqStats(getPlayerEntity(gameState));

  return eqStats;
};
