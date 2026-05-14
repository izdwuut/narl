
import type { GameState } from "../../state/state";
import type { ActionResolution } from "../actions/types";
import { prepareAttack } from "../attack/resolveAttackAction";
import { addLogImmutable } from "../log/log";
import { increaseTurn } from "../turn/turn";
import { playerActionResolvers } from "./resolvers";
import { PlayerActionType, type PlayerAction } from "./types";

export const resolvePlayerAction = (
  state: GameState,
  action: PlayerAction,
): ActionResolution => {
  switch (action.type) {
    case PlayerActionType.ATTACK: {
      const ctx = prepareAttack(state, action);
      if (!ctx.ok) {
        return {
          nextState: addLogImmutable(state, ctx.message),
          consumesTurn: false,
          pendingActions: [],
        };
      }
      const actionResolution = (
        playerActionResolvers[action.type] as (
          state: GameState,
          playerAction: typeof action,
        ) => ActionResolution
      )(state, action);
       let nextState = actionResolution.nextState;

      if (actionResolution.consumesTurn) {
        nextState = increaseTurn(nextState);
      }
      return {
        ...actionResolution,
        nextState: actionResolution.action?.flushLogs(nextState) ?? nextState,
      };
    }
    default: {
      const actionResolution = (
        playerActionResolvers[action.type] as (
          state: GameState,
          playerAction: typeof action,
        ) => ActionResolution
      )(state, action);
      let nextState = actionResolution.nextState;

      if (actionResolution.consumesTurn) {
        nextState = increaseTurn(nextState);
      }
      return {
        ...actionResolution,
        nextState: actionResolution.action?.flushLogs(nextState) ?? nextState,
      };
    }
  }
};
