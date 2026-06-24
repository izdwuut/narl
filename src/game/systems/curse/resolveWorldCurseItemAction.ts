import { produce } from "immer";
import type { GameState } from "../../state/state";
import { Action } from "../actions/action";
import type { ActionResolution } from "../actions/types";
import type { WorldCurseItemAction } from "../world/types";

export const resolveCurseItemAction = (
  state: GameState,
  gameAction: WorldCurseItemAction,
): ActionResolution => {
  const action: Action = new Action(gameAction);

  const nextState = produce(state, (draft) => {});

  return action.resolve(nextState);
};
