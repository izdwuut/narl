import type { Entity } from "../../../core/ecs/Entity";
import { getChildrenDmg, getDmg, getDmgMod, getOwnDmg } from "../attack/dmg";
import { isContainer } from "../inv/containers";
import { getItemName } from "../inv/items";

export const getItemInspectLines = (entity: Entity): string[] => {
  const stats = [];
  if (isContainer(entity)) {
    stats.push(`${getDmg(entity)} TOTAL DMG`);
    stats.push(`${getOwnDmg(entity)} OWN DMG`);
    stats.push(`${getChildrenDmg(entity)} CHILDREN DMG`);
    stats.push(`${getDmgMod(entity)} DMG MOD`);
  } else {
    stats.push(`${getDmg(entity)} DMG`);
  }

  const lines = [];
  lines.push(`${getItemName(entity)}: ${stats.join(", ")}`);

  return lines;
};
