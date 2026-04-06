import type { Entity } from "../../../core/ecs/Entity";
import { getComponentByType as getEntityByTypwe } from "../../../core/ecs/queries/component";
import {
  addEntity,
  getEntitiesByType,
  getEntityByType,
  patchEntityById,
} from "../../../core/ecs/queries/entities";
import { SizeComponent } from "../../model/components/CapacityComponent";
import { BackpackEntity } from "../../model/entities/BackpackEntity";
import { ItemEntity } from "../../model/entities/items/ItemEntity";

export const getBackpack = (entity: ItemEntity): BackpackEntity | undefined => {
  return getEntityByType(entity, BackpackEntity);
};

export const isBackpackFull = (backpack: BackpackEntity): boolean => {
  const itemsInBackpack = getEntitiesByType(backpack, ItemEntity)?.length ?? 0;
  const backpackSize = getEntityByTypwe(backpack, SizeComponent)?.size ?? 0;
  const backpackIsFull = itemsInBackpack === backpackSize;

  return backpackIsFull;
};

// TODO: make backpackId optional (if real use case found)
export const addItemToEntityBackpack = (
  entity: Entity,
  item: ItemEntity,
  backpackId: string,
): BackpackEntity => {
  return patchEntityById(entity, backpackId, (backpack) =>
    addEntity(backpack, item),
  );
};
