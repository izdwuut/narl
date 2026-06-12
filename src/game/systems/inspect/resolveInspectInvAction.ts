import { produce } from "immer";
import type { GameState } from "../../state/state";
import { Action } from "../actions/action";
import type { ActionResolution } from "../actions/types";
import type { PlayerInspectInvAction } from "../player/types";
import { getPlayerEntity } from "../../state/selectors/player";
import { getBackpack, getContainerItemAt } from "../inv/containers";
import { getItemInspectLines } from "./inspect";

export const resolveInspectInvAction = (
  state: GameState,
  gameAction: PlayerInspectInvAction,
): ActionResolution => {
  const { invSlot } = gameAction;
  const action: Action = new Action(gameAction);

  const nextState = produce(state, (draft) => {
    const player = getPlayerEntity(draft);
    const backpack = action.assert(
      getBackpack(player),
      "Player has no backpack",
    );

    const item = getContainerItemAt(backpack, invSlot);

    if (!item) {
      return action.info(`Inv slot ${invSlot} is empty`);
    }

    getItemInspectLines(item).forEach((line) => action.info(line));
  });

  return action.resolve(nextState, false);
};
