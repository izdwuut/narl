import type { GameState } from "../../state";

export const increaseTurn = (state: GameState): GameState => {
  return {
    ...state,
    turn: state.turn + 1,
  };
};
