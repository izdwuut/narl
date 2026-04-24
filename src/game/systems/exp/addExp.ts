import type { Entity } from "../../../core/ecs/Entity";
import {
  hasComponentByType,
  patchComponentByType,
} from "../../../core/ecs/queries/component";
import { ExpComponent } from "../../model/components/ExpComponent";
import { VisitedComponent } from "../../model/components/VisitedComponent";
import type { FloorEntity } from "../../model/entities/FloorEntity";
import type { PlayerEntity } from "../../model/entities/PlayerEntity";
import { EXP } from "./expTable";

export const addExp = (exp: number, entity: Entity | undefined): Entity => {
  if (!entity) throw new Error("Cannot add exp to undefined entity.");

  return patchComponentByType(entity, ExpComponent, (expComponent) => {
    expComponent.exp += exp;
    console.log(expComponent.exp);
    return expComponent;
  });
};

export const addExplorationExp = (
  floor: FloorEntity,
  player: PlayerEntity | undefined,
): PlayerEntity => {
  if (!player) throw new Error("Cannot add exp to undefined player.");

  if (!hasComponentByType(floor, VisitedComponent)) {
    return addExp(EXP.VISITED_TILE, player);
  }

  return player;
};
