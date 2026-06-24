import type { Entity } from "../../../core/ecs/Entity";
import { hasComponentByType } from "../../../core/ecs/queries/component";
import { CursedComponent } from "../../model/components/items/CursedComponent";
import {
  getItemFactory,
  type ItemClass,
} from "../../model/entities/items/getItemFactory";
import type { Action } from "../actions/action";
import { getItemName } from "../inv/items";

export const isCursed = (entity: Entity) => {
  return hasComponentByType(entity, CursedComponent);
};

export const curse = (item: Entity, action: Action) => {
  const factory = getItemFactory(item.constructor as ItemClass);

  if (!isCursed(item) && factory.shouldBeCursed?.(item)) {
    const msg = `${getItemName(item)} got cursed`;
    const gotCursed = !!factory.curse?.(item);
    if (gotCursed) {
      action.info(msg);
    }
    return gotCursed;
  }
};
