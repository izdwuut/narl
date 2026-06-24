import type { Entity } from "../../../core/ecs/Entity";
import { replaceEntityById } from "../../../core/ecs/queries/entities";
import { ItemEntity } from "../../model/entities/items/ItemEntity";
import { PlaceholderEntity } from "../../model/entities/items/PlaceholderItemEntity";
import {
  getBackpack,
  getContainerItemAt,
  getContainerItems,
  getFirstEmptyContainerSlot,
  isContainer,
} from "../../model/queries/containers";

export type ContainerSlot = number;

export const addItemToEntityBackpack = (
  entity: Entity,
  item: ItemEntity,
): void => {
  const backpack = getBackpack(entity);
  if (!backpack) {
    throw new Error("No backpack");
  }
  const slot = getFirstEmptyContainerSlot(backpack);
  if (!slot) {
    throw new Error("Backpack is full");
  }
  setContainerItemAt(backpack, slot, item);
};

export const addItemToContainer = (
  container: Entity,
  item: ItemEntity,
): void => {
  if (!isContainer(container)) {
    throw new Error("Entity is not a container");
  }
  const slot = getFirstEmptyContainerSlot(container);
  if (!slot) {
    throw new Error("Container is full");
  }
  setContainerItemAt(container, slot, item);
};


export const swapContainerItems = (
  container: Entity,
  sourceSlot: ContainerSlot,
  targetSlot: ContainerSlot,
): void => {
  if (!isContainer(container)) {
    throw new Error("Entity is not a container");
  }
  const sourceItem = getContainerItemAt(container, sourceSlot);
  const targetItem = getContainerItemAt(container, targetSlot);
  if (!sourceItem) {
    throw new Error("No source item to swap");
  }
  if (!targetItem) {
    throw new Error("No target item to swap");
  }
  setContainerItemAt(container, targetSlot, sourceItem);
  setContainerItemAt(
    container,
    sourceSlot,
    targetItem ?? new PlaceholderEntity(),
  );
};

export const setContainerItemAt = (
  container: Entity,
  slot: ContainerSlot,
  entity: Entity,
): void => {
  if (!isContainer(container)) {
    throw new Error("Entity is not a container");
  }
  if (!container.entities[slot - 1]) {
    throw new Error(`Container slot ${slot} doesn't exist`);
  }
  container.entities[slot - 1] = entity;
};

export const setContainerItemById = (
  container: Entity,
  id: string,
  entity: Entity,
): void => {
  if (!isContainer(container)) {
    throw new Error("Entity is not a container");
  }
  replaceEntityById(container, id, entity);
};

export const clearContainerItemAt = (
  container: Entity,
  slot: ContainerSlot,
): void => {
  if (!isContainer(container)) {
    throw new Error("Entity is not a container");
  }
  setContainerItemAt(container, slot, new PlaceholderEntity());
};

export const clearContainerItemById = (container: Entity, id: string): void => {
  if (!isContainer(container)) {
    throw new Error("Entity is not a container");
  }
  replaceEntityById(container, id, new PlaceholderEntity());
};

export const clearContainerItems = (container: Entity): void => {
  if (!isContainer(container)) {
    throw new Error("Entity is not a container");
  }
  const items = getContainerItems(container);
  items.forEach((item) =>
    replaceEntityById(container, item.id, new PlaceholderEntity()),
  );
};


