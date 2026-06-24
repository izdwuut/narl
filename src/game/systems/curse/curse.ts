import type { Entity } from "../../../core/ecs/Entity";
import {
  getItemFactory,
  type ItemClass,
} from "../../model/entities/items/getItemFactory";
import { isCursed } from "../../model/queries/curse";
import { getItemName } from "../../model/queries/items";
import type { Action } from "../actions/action";

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
