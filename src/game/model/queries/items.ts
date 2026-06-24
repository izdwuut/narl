import type { Entity } from "../../../core/ecs/Entity";
import {
  getComponentByType,
  getComponentsByType,
} from "../../../core/ecs/queries/component";
import { CURSED_PREFIX } from "../../../utils";
import { NameComponent } from "../components/display/NameComponent";
import { ItemSlotComponent } from "../components/eq/ItemSlotComponent";
import type { ItemEntity } from "../entities/items/ItemEntity";
import { isCursed } from "./curse";

const getItemPrefix = (item: ItemEntity) => {
  const cursed = isCursed(item);
  return cursed ? CURSED_PREFIX : undefined;
};

export const getItemName = (item?: ItemEntity) => {
  if (!item) {
    throw new Error("No item to get name from");
  }
  const name = getComponentByType(item, NameComponent)?.name;
  if (name === undefined) {
    throw new Error("Unnamed item");
  }
  return [getItemPrefix(item), name].filter(Boolean).join(" ");
};

export const getItemSlots = (entity: Entity): ItemSlotComponent[] => {
  return getComponentsByType(entity, ItemSlotComponent);
};

