import type { Entity, EntityClass } from "../../../core/ecs/Entity";
import type { Factory } from "../Factory";
import { ITEM_FACTORIES } from "./items/factories";
import { MOB_FACTORIES } from "./mobs/factories";

const factories: Map<EntityClass<Entity>, Factory<Entity>>[] = [
  ITEM_FACTORIES,
  MOB_FACTORIES,
];

export const getFactory = <T extends Entity>(
  entityClass: EntityClass<T>,
) => {
  for (const factory of factories) {
    const target = factory.get(entityClass);
    if (target) {
      return target;
    }
  }

  throw new Error("No entity factory");
};
