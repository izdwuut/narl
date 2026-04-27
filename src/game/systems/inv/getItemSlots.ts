import { Entity, getComponentsByType } from "../../../core/ecs";
import type { ItemEntity } from "../../model";
import { ItemSlotComponent } from "../../model/components/eq/ItemSlotComponent";

export const getItemSlots = (entity: Entity): ItemSlotComponent[] => {
  return getComponentsByType(entity, ItemSlotComponent);
};
