import { produce } from "immer";
import { getPlayerEntity } from "../../state/selectors/player";
import type { GameState } from "../../state/state";
import { Action } from "../actions/action";
import type { ActionResolution } from "../actions/types";
import { getEqSlotAt } from "../eq/eq";
import {
  clearContainerItemById,
  getBackpack,
  getContainerItemById,
} from "../inv/containers";
import { getItemName } from "../inv/items";
import {
  PlayerDropItemActionReason,
  type PlayerDropItemAction,
} from "../player/types";
import { getTile } from "../world/getTile";

export const resolvePlayerDropItemAction = (
  state: GameState,
  gameAction: PlayerDropItemAction,
): ActionResolution => {
  const { eqSlot, itemId, targetPosition, reason } = gameAction;
  const action: Action = new Action(gameAction);
  const nextState = produce(state, (draft) => {
    const player = getPlayerEntity(draft);

    action.assertCondition(itemId, "Can't drop item without itemId");
    const source = action.assert(
      eqSlot ? getEqSlotAt(player, eqSlot) : getBackpack(player),
      "Can't drop item without source",
    );
    const itemToDrop = action.assert(
      getContainerItemById(source, itemId),
      "Can't drop item. Item not found",
    );

    const tile = getTile(draft, targetPosition);
    tile.items.push(itemToDrop);

    clearContainerItemById(source, itemToDrop.id);
    if (reason === PlayerDropItemActionReason.MANUAL) {
      return action.success(`Dropped ${getItemName(itemToDrop)}`);
    }

    return action.success(
      `Backpack is full. Dropped ${getItemName(itemToDrop)} to the ground`,
    );
  });

  return action.resolve(nextState);
};
