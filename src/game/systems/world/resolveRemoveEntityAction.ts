import { produce } from "immer";
import type { GameState } from "../../state/state";
import { WorldActionEntityType, type WorldRemoveEntityAction } from "./types";
import type { ActionResolution } from "../actions/types";
import { Action } from "../actions/action";
import { getMobById, killMobById } from "../attack/mobs";
import { getComponentByType } from "../../../core/ecs/queries/component";
import { NameComponent } from "../../model/components/NameComponent";
import { getTile } from "./getTile";

export const resolveRemoveEntityAction = (
  state: GameState,
  gameAction: WorldRemoveEntityAction,
): ActionResolution => {
  const action = new Action(gameAction);
  const { entityId, entityType, position } = gameAction;
  const nextState = produce(state, (draft) => {
    const tile = getTile(draft, position);

    if (entityType === WorldActionEntityType.PLAYER) {
      throw new Error("Can't remove player");
    }

    if (!entityId) {
      throw new Error("No entity id to drop item");
    }
    const mob = getMobById(tile, entityId);
    const mobName = getComponentByType(mob, NameComponent)?.name;
    killMobById(tile, entityId);
    return action.success(`${mobName} died`);
  });

  return action.resolve(nextState);
};
