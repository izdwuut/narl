import { produce } from "immer";
import {
  getPlayerEntity,
  getPlayerPosition,
} from "../../state/selectors/player";
import type { GameState } from "../../state/state";
import { Action } from "../actions/action";
import type { ActionResolution } from "../actions/types";
import {
  addItemToEntityBackpack,
  clearContainerItemAt,
  getBackpack,
  isContainerFull,
} from "../inv/containers";
import { getItemName } from "../inv/items";
import {
  PlayerActionType,
  PlayerDropItemActionReason,
  type PlayerUnequipItemAction,
} from "../player/types";
import { getEqSlotAt, getEquippedWeapon } from "./eq";

export const resolveUnequipAction = (
  state: GameState,
  gameAction: PlayerUnequipItemAction,
): ActionResolution => {
  const { eqSlot: eqSlotIndex } = gameAction;
  const action: Action = new Action(gameAction);
  const nextState = produce(state, (draft) => {
    const player = getPlayerEntity(draft);
    const backpack = action.assert(
      getBackpack(player),
      "Player has no backpack",
    );
    const isFull = isContainerFull(backpack);
    const equippedWeapon = getEquippedWeapon(player);
    if (!equippedWeapon) {
      return action.fail(`No item in slot ${eqSlotIndex} to unequip`);
    }

    if (isFull) {
      action.addPending({
        type: PlayerActionType.DROP_ITEM,
        targetPosition: getPlayerPosition(draft),
        eqSlot: eqSlotIndex,
        invSlot: undefined,
        reason: PlayerDropItemActionReason.BACKPACK_FULL,
      });
      return;
    }

    addItemToEntityBackpack(player, equippedWeapon);
    clearContainerItemAt(getEqSlotAt(player, eqSlotIndex), 1);
    action.success(
      `Unequipped ${getItemName(equippedWeapon)} from EQ slot ${eqSlotIndex}`,
    );
  });

  return action.resolve(nextState);
};
