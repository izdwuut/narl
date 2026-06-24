import type { Entity } from "../../../core/ecs/Entity";
import {
  getComponentByType,
  getComponentsByType,
  hasComponentByType,
  upsertComponents,
} from "../../../core/ecs/queries/component";
import { DEFAULT_INSPECTED_TIMES } from "../../../utils";
import { InspectDescComponent } from "../../model/components/inspect/InspectDescComponent";
import { InspectedComponent } from "../../model/components/inspect/InspectedComponent";
import { DefComponent } from "../../model/components/items/DefComponent";
import { DmgComponent } from "../../model/components/items/DmgComponent";
import { getDef } from "../../../game/systems/attack/def";
import { getChildrenDmg, getDmg, getDmgMod, getOwnDmg } from "../../../game/systems/attack/dmg";
import { isContainer } from "../inv/containers";
import { getItemName } from "../inv/items";

const getInspectDesc = (entity: Entity) => {
  const inspected = getComponentByType(entity, InspectedComponent);
  if (!inspected) {
    return "";
  }
  const inspectDesc = (getComponentsByType(entity, InspectDescComponent) ?? [])
    .filter(({ times: requiredTimes }) => inspected.times >= requiredTimes)
    .sort((a, b) => a.times - b.times);

  return inspectDesc.at(-1)?.text ?? "";
};

export const getItemInspectText = (entity: Entity): string => {
  const stats = [];
  if (isContainer(entity)) {
    stats.push(`${getDmg(entity)} TOTAL DMG`);
    stats.push(`${getOwnDmg(entity)} OWN DMG`);
    stats.push(`${getChildrenDmg(entity)} CHILDREN DMG`);
    stats.push(`${getDmgMod(entity)} DMG MOD`);
  } else {
    if (hasComponentByType(entity, DmgComponent)) {
      stats.push(`${getDmg(entity)} DMG`);
    }
    if (hasComponentByType(entity, DefComponent)) {
      stats.push(`${getDef(entity)} DEF`);
    }
  }

  let lines = [];
  lines.push(getItemName(entity));
  lines.push(getInspectDesc(entity));
  lines.push(stats.join(", "));
  lines = lines.filter(Boolean);
  return lines.join(". ");
};

export const increaseInspected = (item: Entity) => {
  const inspected =
    getComponentByType(item, InspectedComponent) ?? new InspectedComponent();
  inspected.times = inspected.times + 1;
  upsertComponents(item, inspected);
};
