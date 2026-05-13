
import type { Action } from "./action";
import type { WorldAction, WorldActionType } from "./gameAction/types";
import type { PlayerAction, PlayerActionType } from "../player/types";
import type { GameState } from "../../state/state";

export type ActionType = PlayerActionType | WorldActionType;

export type GameAction = PlayerAction | WorldAction;

export type ActionResolution = {
  nextState: GameState;
  consumesTurn: boolean;
  pendingActions: GameAction[];
  action?: Action;
};
