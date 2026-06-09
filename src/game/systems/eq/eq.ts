import type { Entity } from "../../../core/ecs/Entity";
import {
  getEntitiesByType,
  getEntityByType,
} from "../../../core/ecs/queries/entities";
import { EqEntity } from "../../model/entities/eq/EqEntity";
import { EqSlotEntity } from "../../model/entities/eq/EqSlotEntity";
import { ItemEntity } from "../../model/entities/items/ItemEntity";
import { getWeaponDmg } from "../attack/dmg";
import { getContainerItemAt } from "../inv/containers";
import type { EqSlot } from "./types";

export const getEq = (entity: Entity): EqEntity | undefined => {
  return getEntityByType(entity, EqEntity);
};

export const getEqSlots = (entity: Entity) => {
  const eq = getEq(entity);
  return getEntitiesByType(eq, EqSlotEntity);
};

export const getEqSlotAt = (entity: Entity, slot: EqSlot) => {
  return getEqSlots(entity)[slot - 1];
};

export const getEquippedWeaponDamage = (weapon: ItemEntity) => {
  const dmg = getWeaponDmg(weapon);
  return dmg;
};

export const getEquippedWeapon = (entity: Entity): ItemEntity | undefined => {
  const slot = getEqSlotAt(entity, 1);
  return getContainerItemAt(slot, 1);
};
