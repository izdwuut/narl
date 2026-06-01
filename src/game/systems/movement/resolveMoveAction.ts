import { produce } from "immer";
import { upsertComponent } from "../../../core/ecs/queries/component";
import { VisitedComponent } from "../../model/components/VisitedComponent";
import {
  getPlayerEntity,
  getPlayerPosition,
} from "../../state/selectors/player";
import type { GameState } from "../../state/state";
import { Action } from "../actions/action";
import type { ActionResolution } from "../actions/types";
import { hasMobs } from "../attack/mobs";
import { addExplorationExp } from "../exp/exp";
import { PlayerActionType, type PlayerMoveAction } from "../player/types";
import { discoverTiles, getTile } from "../world/getTile";
import { getNextPlayerPosition } from "./getNextPlayerPosition";

const markAsVisited = (state: GameState, position: number): void => {
  upsertComponent(state.world[position].floor, new VisitedComponent());
};

const getNextState = (state: GameState, nextPlayerPosition: number): void => {
  const world = state.world;
  const player = getPlayerEntity(state);
  state.player = {
    player: addExplorationExp(world[nextPlayerPosition].floor, player),
    position: nextPlayerPosition,
  };
  markAsVisited(state, nextPlayerPosition);
};

export const resolveMoveAction = (
  state: GameState,
  gameAction: PlayerMoveAction,
): ActionResolution => {
  const { direction } = gameAction;
  const action = new Action(gameAction);
  const nextState = produce(state, (draft) => {
    const currentPlayerPosition = getPlayerPosition(draft);
    const nextPlayerPosition = getNextPlayerPosition({
      currentPosition: currentPlayerPosition,
      direction,
    });

    if (nextPlayerPosition === null) {
      return action.fail(`Cannot move ${direction.toLowerCase()}`);
    }
    discoverTiles(draft, nextPlayerPosition);
    const nextTile = getTile(draft, nextPlayerPosition);
    if (hasMobs(nextTile)) {
      return action.addPending({
        type: PlayerActionType.ATTACK,
        targetPosition: nextPlayerPosition,
      });
    }

    getNextState(draft, nextPlayerPosition);
    action.success(`Moved ${direction.toLowerCase()}`);
  });

  return action.resolve(nextState);
};
