import {
    Entity,
    getEntitiesByType,
    getEntityByType
} from "../../../core/ecs";
import { EqSlotEntity } from "../../model/entities/eq/EqSlotEntity";
import { EquipmentEntity } from "../../model/entities/eq/EquipmentEntity";

const getEq = (entity: Entity): EquipmentEntity | undefined => {
  return getEntityByType(entity, EquipmentEntity);
};

export const getEqSlots = (entity: Entity) => {
  const eq = getEq(entity);
  return getEntitiesByType(eq, EqSlotEntity);
};
