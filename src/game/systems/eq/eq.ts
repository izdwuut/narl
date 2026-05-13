import type { Entity } from "../../../core/ecs/Entity";
import { getComponentByType } from "../../../core/ecs/queries/component";
import { getEntitiesByType, getEntityByType, removeEntityById } from "../../../core/ecs/queries/entities";
import { DmgComponent } from "../../model/components/DmgComponent";
import { EqEntity } from "../../model/entities/eq/EqEntity";
import { EqSlotEntity } from "../../model/entities/eq/EqSlotEntity";
import { ItemEntity } from "../../model/entities/items/ItemEntity";

export const getEq = (entity: Entity): EqEntity | undefined => {
  return getEntityByType(entity, EqEntity);
};

export const getEqSlots = (entity: Entity) => {
  const eq = getEq(entity);
  return getEntitiesByType(eq, EqSlotEntity);
};

export const getEquippedWeapon = (entity: Entity): ItemEntity | undefined => {
  const eq = getEq(entity);
  const slot = getEntitiesByType(eq, EqSlotEntity)[0];
  const weapon = getEntitiesByType(slot, ItemEntity)[0];
  return weapon;
};

export const getEquippedWeaponDamage = (weapon: ItemEntity) => {
  const dmg = getComponentByType(weapon, DmgComponent)?.dmg;
  return dmg;
};

export const unequipWeapon = (entity: Entity, index: number) => {
  const slots = getEqSlots(entity);
  const slot = slots[index];
  const weapon = getEntityByType(slot, ItemEntity);
  if (weapon) {
    removeEntityById(slot, weapon.id);
  }
  return weapon;
};
