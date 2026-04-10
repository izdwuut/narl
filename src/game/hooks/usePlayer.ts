import { useContext } from "react";
import { GameContext } from "../state/context";
import { getPlayer } from "../state/selectors/getPlayer";
import type { PlayerEntity } from "../model/entities/PlayerEntity";
import { getBackpack } from "../systems/pickUp/backpack";
import type { BackpackEntity } from "../model/entities/BackpackEntity";

type Player = {
    player: PlayerEntity;
    getPlayerBackpack: () => BackpackEntity | undefined
}

export const usePlayer = (): Player => {
  const { gameState } = useContext(GameContext);
  const player = getPlayer(gameState);
  const getPlayerBackpack = () => getBackpack(player);

  return { player, getPlayerBackpack };
};
