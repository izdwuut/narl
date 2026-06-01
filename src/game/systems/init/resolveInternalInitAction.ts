import { produce } from "immer";
import { INITIAL_TURN } from "../../../utils";
import type { GameState } from "../../state/state";
import { Action } from "../actions/action";
import type { ActionResolution } from "../actions/types";
import { type InternalInitAction } from "../internal/type";
import { initWorld } from "./initWorld";
import { initPlayer } from "./initPlayer";

export const resolveInternalInitAction = (
  state: GameState,
  gameAction: InternalInitAction,
): ActionResolution => {
  const action = new Action(gameAction);

  if (state.initialized) {
    return action.resolve(state);
  }

  const nextState = produce(state, (draft) => {
    draft.world = initWorld();
    draft.turn = INITIAL_TURN;
    draft.log = [];
    draft.initialized = true;
    draft.player = initPlayer();
    action.info("You'd rather stay dead");
  });

  return action.resolve(nextState);
};
