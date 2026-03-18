import type { Entity } from "../../model/base/Entity";

export const getEntityById = (
  entity: Entity,
  childEntityId: string
): Entity | undefined =>
  entity.entities.find((child) => child.id === childEntityId);

export const hasEntityById = (
  entity: Entity,
  childEntityId: string
): boolean =>
  entity.entities.some((child) => child.id === childEntityId);

export const addEntity = (
  entity: Entity,
  child: Entity
): Entity => ({
  ...entity,
  entities: [...entity.entities, child],
});

export const removeEntityById = (
  entity: Entity,
  childEntityId: string
): Entity => {
  const nextEntities = entity.entities.filter(
    (child) => child.id !== childEntityId
  );

  return nextEntities.length === entity.entities.length
    ? entity
    : {
        ...entity,
        entities: nextEntities,
      };
};

export const replaceEntityById = (
  entity: Entity,
  childEntityId: string,
  nextChild: Entity
): Entity => {
  let replaced = false;

  const nextEntities = entity.entities.map((child) => {
    if (child.id !== childEntityId) return child;
    replaced = true;
    return nextChild;
  });

  return replaced
    ? {
        ...entity,
        entities: nextEntities,
      }
    : entity;
};

export const upsertEntityById = (
  entity: Entity,
  nextChild: Entity
): Entity => {
  const exists = entity.entities.some((child) => child.id === nextChild.id);

  return exists
    ? replaceEntityById(entity, nextChild.id, nextChild)
    : addEntity(entity, nextChild);
};

export const patchEntityById = (
  entity: Entity,
  childEntityId: string,
  patcher: (child: Entity) => Entity
): Entity => {
  let changed = false;

  const nextEntities = entity.entities.map((child) => {
    if (child.id !== childEntityId) return child;
    changed = true;
    return patcher(child);
  });

  return changed
    ? {
        ...entity,
        entities: nextEntities,
      }
    : entity;
};