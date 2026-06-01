import { produce } from "immer";
import type { Entity } from "../../../core/ecs/Entity";
import { getComponentByType } from "../../../core/ecs/queries/component";
import {
  getEntityById,
  removeEntityById,
} from "../../../core/ecs/queries/entities";
import { NameComponent } from "../../model/components/NameComponent";
import { getPlayerEntity } from "../../state/selectors/player";
import type { GameState } from "../../state/state";
import { Action } from "../actions/action";
import type { ActionResolution } from "../actions/types";
import { getMobById } from "../attack/mobs";
import { getBackpack } from "../inv/containers";
import { getItemName } from "../inv/items";
import { getTile } from "../world/getTile";
import {
  WorldActionEntityType,
  type WorldDropItemAction,
} from "../world/types";

// TODO: split into resolvePlayerDropAction and resolveMobDropAction
export const resolveDropItemAction = (
  state: GameState,
  gameAction: WorldDropItemAction,
): ActionResolution => {
  const { entityId, entityType, targetPosition, itemId } = gameAction;
  const action = new Action(gameAction);
  const nextState = produce(state, (draft) => {
    let source: Entity | undefined = undefined;
    let sourceEntityName: string | undefined;
    const tile = getTile(draft, targetPosition);
    if (entityType === WorldActionEntityType.PLAYER) {
      source = getBackpack(getPlayerEntity(draft));
    } else if (entityType === WorldActionEntityType.MOB) {
      if (!entityId) {
        throw new Error("No mob id");
      }
      source = getMobById(tile, entityId);
      sourceEntityName = getComponentByType(source, NameComponent)?.name;
    }
    if (!source) {
      throw new Error("No entity");
    }

    if (!itemId) {
      return action.fail(`Nothing to drop`);
    }
    const itemToDrop = getEntityById(source, itemId);
    if (!itemToDrop) {
      return action.fail(`Nothing to drop`);
    }
    tile.items.push(itemToDrop);
    removeEntityById(source, itemToDrop.id);

    if (sourceEntityName) {
      return action.success(
        `${sourceEntityName} dropped ${getItemName(itemToDrop)}`,
      );
    }
    return action.success(`Dropped ${getItemName(itemToDrop)}`);
  });

  return action.resolve(nextState);
};
