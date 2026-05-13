import type { GameState } from "../../state";
import { resolveDropAction } from "../drop/resolveDropAction";
import { resolveCurseItemAction } from "../curse/resolveCurseItemAction";
import {
  increaseTurn,
  WorldActionType,
  type ActionResolution,
  type WorldAction,
} from "../turn";
import { resolveRemoveEntityAction } from "./resolveRemoveEntityAction";

export const resolveWorldAction = (
  state: GameState,
  action: WorldAction,
): ActionResolution => {
  switch (action.type) {
    case WorldActionType.REMOVE_ENTITY: {
      const actionResolution = resolveRemoveEntityAction(
        state,
        action
      );
      let nextState = actionResolution.nextState;
      if (actionResolution.consumesTurn) {
        nextState = increaseTurn(nextState);
      }
      return {
        ...actionResolution,
        nextState: actionResolution.action?.flushLogs(nextState) ?? nextState,
      };
    }
    case WorldActionType.DROP_ITEM: {
      const actionResolution = resolveDropAction(
        state,
        action
      );
      let nextState = actionResolution.nextState;
      if (actionResolution.consumesTurn) {
        nextState = increaseTurn(nextState);
      }
      return {
        ...actionResolution,
        nextState: actionResolution.action?.flushLogs(nextState) ?? nextState,
      };
    }
    case WorldActionType.CURSE_ITEM: {
      const actionResolution = resolveCurseItemAction(state, action);
      let nextState = actionResolution.nextState;
      if (actionResolution.consumesTurn) {
        nextState = increaseTurn(nextState);
      }
      return {
        ...actionResolution,
        nextState: actionResolution.action?.flushLogs(nextState) ?? nextState,
      };
    }
    default:
      return {
        nextState: state,
        consumesTurn: false,
        pendingActions: [],
      };
  }
};
