import type { PlayerEntity } from "../../model/entities/PlayerEntity";
import type { GameState } from "../state";

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
