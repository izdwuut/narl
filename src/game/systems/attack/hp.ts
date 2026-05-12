import { getComponentByType, type Entity } from "../../../core/ecs";
import { HpComponent } from "../../model/components/HpComponent";

export const getHp = (entity: Entity): HpComponent => {
  const hpComponent = getComponentByType(entity, HpComponent);

  if (!hpComponent) {
    throw new Error(`Entity does not have an HpComponent`);
  }

  return hpComponent;
};
