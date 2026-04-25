import { Entity, getEntityByType } from "../../core/ecs";
import { ItemEntity } from "../model";
import type { EqSlotEntity } from "../model/entities/eq/EqSlotEntity";
import { getEqSlots } from "../systems";

export type Eq = {
  eqSlots: EqSlotEntity[];
  getItemInSlot: (slot: EqSlotEntity) => ItemEntity | undefined;
};

export const useEq = (entity: Entity): Eq => {
  const eqSlots = getEqSlots(entity);
  const getItemInSlot = (slot: EqSlotEntity) => {
    return getEntityByType(slot, ItemEntity);
  };

  return { eqSlots, getItemInSlot };
};
