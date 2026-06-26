import type { Entity, EntityClass } from "../../../core/ecs/Entity";
import type { Manual } from "../Manual";
import { ITEM_MANUALS } from "./items/manuals";
import { MOB_MANUALS } from "./mobs/manuals";

const manuals: Map<EntityClass<Entity>, Manual<Entity>>[] = [
  MOB_MANUALS,
  ITEM_MANUALS,
];

export const getManual = <T extends Entity>(entity: T) => {
  for (const manual of manuals) {
    const target = manual.get(entity.constructor as EntityClass<T>);
    if (target) {
      return target;
    }
  }
};
