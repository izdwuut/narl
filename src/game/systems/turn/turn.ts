import type { GameState } from "../../state/state";

export const increaseTurn = (state: GameState): GameState => {
  return {
    ...state,
    turn: state.turn + 1,
  };
};
