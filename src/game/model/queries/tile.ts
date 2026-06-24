import type { GameState, Tile } from "../../state/state";

export const getTile = (gameState: GameState, position: number): Tile => {
  const tile = gameState.world[position];

  if (!tile) {
    throw new Error(`Tile ${position} does not exist`);
  }

  return tile;
};
