import type { Entity } from "../../../core/ecs/Entity";
import { getComponentByType } from "../../../core/ecs/queries/component";
import { DEFAULT_INSPECTED_TIMES } from "../../../utils";
import { InspectedComponent } from "../components/inspect/InspectedComponent";

export const getInspectedTimes = (item: Entity) => {
  return (
    getComponentByType(item, InspectedComponent)?.times ??
    DEFAULT_INSPECTED_TIMES
  );
};
