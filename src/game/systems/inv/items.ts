import { getComponentByType } from "../../../core/ecs";
import { CURSED_PREFIX } from "../../../utils";
import type { ItemEntity } from "../../model";
import { NameComponent } from "../../model/components/NameComponent";
import { isCursed } from "../curse/curse";

const getItemPrefix = (item: ItemEntity) => {
  const cursed = isCursed(item);
  return cursed ? CURSED_PREFIX : undefined;
};

export const getItemName = (item: ItemEntity) => {
  const name = getComponentByType(item, NameComponent)?.name;
  if (name === undefined) {
    throw new Error("Unnamed item");
  }
  return [getItemPrefix(item), name].filter(Boolean).join(" ");
};
