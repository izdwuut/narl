import {
  addEntity,
  removeEntityById,
  replaceEntityById,
} from "../../../core/ecs";
import type { ItemSlotComponent } from "../../model/components/eq/ItemSlotComponent";
import { getPlayer } from "../../state";
import { replacePlayer } from "../../state/actions/replacePlayer";
import type { GameState } from "../../state/state";
import { getItemSlots } from "../inv/getItemSlots";
import { fulfillAction, rejectAction } from "../log/action";
import { getBackpack, getBackpackItem } from "../pickUp";
import type { ActionResolution, EqSlot, InvSlot } from "../turn";

import { getEq, getEqSlots } from "./getEq";

const canBeEquipped = (
  itemSlots: ItemSlotComponent[],
  eqSlots: ItemSlotComponent[],
): boolean => {
  const uniqueSlots = new Set([
    ...itemSlots.map((slot) => Object.getPrototypeOf(slot)),
    ...eqSlots.map((slot) => Object.getPrototypeOf(slot)),
  ]);
  return itemSlots.length + eqSlots.length > uniqueSlots.size;
};

export const resolveEquipAction = (
  state: GameState,
  invSlot: InvSlot,
  eqSlot: EqSlot,
): ActionResolution<GameState> => {
  const oldPlayer = getPlayer(state);
  const oldBackpack = getBackpack(oldPlayer);

  if (!oldBackpack) {
    throw new Error("Player has no backpack");
  }

  const itemToEquip = getBackpackItem(oldBackpack, invSlot);

  if (!itemToEquip) {
    return rejectAction(state, `No item in slot ${invSlot} to equip.`, false);
  }

  const oldSlot = getEqSlots(oldPlayer)[eqSlot - 1];
  const eqItemSlots = getItemSlots(oldSlot);
  const itemSlots = getItemSlots(itemToEquip);

  if (!canBeEquipped(itemSlots, eqItemSlots)) {
    return rejectAction(
      state,
      `Item in slot ${invSlot} can't be equipped in eq slot ${eqSlot}.`,
      false,
    );
  }

  const oldEq = getEq(oldPlayer);

  if (!oldEq) {
    throw new Error("Player has no equipment");
  }

  const newBackpack = removeEntityById(oldBackpack, itemToEquip.id);
  const newSlot = addEntity(oldSlot, itemToEquip);
  const newEq = replaceEntityById(oldEq, oldSlot.id, newSlot);
  let newPlayer = replaceEntityById(oldPlayer, oldEq.id, newEq);
  newPlayer = replaceEntityById(newPlayer, oldBackpack.id, newBackpack);

  return fulfillAction(
    replacePlayer(state, newPlayer),
    `Equipped item from slot ${invSlot} to eq slot ${eqSlot}.`,
    true,
  );
};
