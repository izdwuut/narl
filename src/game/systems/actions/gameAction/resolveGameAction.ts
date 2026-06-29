import type { GameState } from "../../../state/state";
import { isInternalAction } from "../../internal/guards";
import { resolveInternalAction } from "../../internal/resolveInternalAction";
import { isPlayerAction } from "../../player/guards";
import { resolvePlayerAction } from "../../player/resolvePlayerAction";
import { isWorldAction } from "../../world/guards";
import { resolveWorldAction } from "../../world/resolveWorldAction";
import type { ActionResolution, GameAction } from "../types";

export const resolveGameAction = (
  state: GameState,
  action: GameAction,
): ActionResolution => {
  if (isPlayerAction(action)) {
    return resolvePlayerAction(state, action);
  }

  if (isWorldAction(action)) {
    return resolveWorldAction(state, action);
  }

  if (isInternalAction(action)) {
    return resolveInternalAction(state, action);
  }

  throw new Error("Invalid game action");
};
