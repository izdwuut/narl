import {
    Entity,
    getEntitiesByType,
    getEntityByType
} from "../../../core/ecs";
import { EqSlotEntity } from "../../model/entities/eq/EqSlotEntity";
import { EqEntity } from "../../model/entities/eq/EqEntity";

export const getEq = (entity: Entity): EqEntity | undefined => {
  return getEntityByType(entity, EqEntity);
};

export const getEqSlots = (entity: Entity) => {
  const eq = getEq(entity);
  return getEntitiesByType(eq, EqSlotEntity);
};
