import type { GameState } from "..";
import type { PlayerEntity } from "../..";

export const replacePlayer = (
  state: GameState,
  newPlayer: PlayerEntity,
): GameState => {
  return {
    ...state,
    world: state.world.map((tile) => {
      if (tile.player) {
        return {
          ...tile,
          player: newPlayer,
        };
      }
      return tile;
    }),
  };
};
