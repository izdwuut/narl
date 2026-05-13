
import type { GameState } from "../../state/state";
import type { WorldAction } from "../actions/gameAction/types";
import type { ActionResolution } from "../actions/types";
import { increaseTurn } from "../turn/turn";
import { worldActionResolvers } from "./resolvers";

export const resolveWorldAction = (
  state: GameState,
  action: WorldAction,
): ActionResolution => {
  switch (action.type) {
    default: {
      const actionResolution = (
        worldActionResolvers[action.type] as (
          state: GameState,
          worldAction: typeof action,
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
