import { produce } from "immer";
import type { GameState } from "../../state/state";
import { Action } from "../actions/action";
import type { ActionResolution } from "../actions/types";
import type { PlayerCurseItemAction } from "../player/types";

export const resolvePlayerCurseItemAction = (
  state: GameState,
  gameAction: PlayerCurseItemAction,
): ActionResolution => {
  const action: Action = new Action(gameAction);
  const nextState = produce(state, () => {});

  return action.resolve(nextState);
};
