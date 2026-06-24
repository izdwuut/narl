import type { EqSlot } from "../eq/types";
import type { InvSlot } from "../inv/types";
import type { Direction } from "../turn/types";

export enum PlayerActionType {
  MOVE = "MOVE",
  PICK_UP = "PICK_UP",
  PICK_UP_UNPACK = "PICK_UP_UNPACK",
  EQUIP_ITEM = "EQUIP_ITEM",
  UNEQUIP_ITEM = "UNEQUIP_ITEM",
  ATTACK = "ATTACK",
  MOVE_ITEM = "MOVE_ITEM",
  DROP_ITEM = "PLAYER_DROP_ITEM",
  INSPECT_INV = "INSPECT_INV",
  INSPECT_EQ = "INSPECT_EQ",
  CURSE_ITEM = "CURSE_ITEM",
}

export enum PlayerDropItemActionReason {
  MANUAL = "MANUAL",
  BACKPACK_FULL = "BACKPACK_FULL",
}

export enum PlayerCurseItemSource {
  INV = "INV",
  EQ = "EQ",
}

export type PlayerDropItemAction = {
  type: PlayerActionType.DROP_ITEM;
  targetPosition: number;
  invSlot: InvSlot | undefined;
  eqSlot: EqSlot | undefined;
  reason: PlayerDropItemActionReason;
};
export type PlayerMoveAction = {
  type: PlayerActionType.MOVE;
  direction: Direction;
};
export type PlayerPickUpAction = { type: PlayerActionType.PICK_UP };
export type PlayerPickUpUnpackAction = {
  type: PlayerActionType.PICK_UP_UNPACK;
};
export type PlayerEquipItemAction = {
  type: PlayerActionType.EQUIP_ITEM;
  invSlot: InvSlot;
  eqSlot: EqSlot;
};
export type PlayerUnequipItemAction = {
  type: PlayerActionType.UNEQUIP_ITEM;
  eqSlot: EqSlot;
};
export type PlayerAttackAction = {
  type: PlayerActionType.ATTACK;
  targetPosition: number;
};
export type PlayerInspectInvAction = {
  type: PlayerActionType.INSPECT_INV;
  invSlot: InvSlot;
};
export type PlayerInspectEqAction = {
  type: PlayerActionType.INSPECT_EQ;
  eqSlot: EqSlot;
};
export type PlayerMoveItemAction = {
  type: PlayerActionType.MOVE_ITEM;
  fromSlot: InvSlot;
  toSlot: InvSlot;
};
export type PlayerCurseItemAction = {
  type: PlayerActionType.CURSE_ITEM;
  invSlot?: InvSlot;
  eqSlot?: EqSlot;
};

export type PlayerAction =
  | PlayerDropItemAction
  | PlayerMoveAction
  | PlayerPickUpAction
  | PlayerPickUpUnpackAction
  | PlayerEquipItemAction
  | PlayerUnequipItemAction
  | PlayerAttackAction
  | PlayerMoveItemAction
  | PlayerInspectInvAction
  | PlayerInspectEqAction
  | PlayerCurseItemAction;
