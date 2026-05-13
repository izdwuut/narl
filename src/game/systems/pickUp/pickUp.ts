import type { Entity } from "../../../core/ecs/Entity";
import { hasComponentByType } from "../../../core/ecs/queries/component";
import { PickupableComponent } from "../../model/components/PickupableComponent";
import type { ItemEntity } from "../../model/entities/items/ItemEntity";
import type { Tile } from "../../state/state";

export const pickUpItem = (tile: Tile): ItemEntity | undefined => {
  return tile.items[0];
};

export const isPickupable = (item: Entity) => {
  return hasComponentByType(item, PickupableComponent);
};
