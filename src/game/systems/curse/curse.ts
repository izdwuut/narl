import type { Entity } from "../../../core/ecs/Entity";
import { getManual } from "../../model/entities/getManual";
import { isCursed } from "../../model/queries/curse";
import type { Action } from "../actions/action";
import { getEntityName } from "../inspect/getEntityName";

export const curse = (item: Entity, action: Action) => {
  const manual = getManual(item);

  if (!isCursed(item) && manual?.shouldBeCursed?.(item)) {
    const msg = `${getEntityName(item)} got cursed`;
    const gotCursed = !!manual?.curse?.(item);
    if (gotCursed) {
      action.info(msg);
    }
    return gotCursed;
  }
};
