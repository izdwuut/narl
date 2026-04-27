import type { GameState } from "../../state/state";
import { resolveEquipAction } from "../eq/resolveEquipAction";
import { resolveMoveAction } from "../movement";
import { resolvePickUpAction } from "../pickUp/resolvePickUpAction";
import {
  GameActionType,
  type ActionResolution,
  type GameAction,
} from "./types";

export const resolvePlayerAction = (
  state: GameState,
  action: GameAction,
): ActionResolution<GameState> => {
  switch (action.type) {
    case GameActionType.MOVE:
      return resolveMoveAction(state, action.direction);
    case GameActionType.PICK_UP:
      return resolvePickUpAction(state);
    case GameActionType.EQUIP_ITEM:
      return resolveEquipAction(state, action.invSlot, action.eqSlot);
    default:
      return {
        nextState: state,
        consumesTurn: false,
      };
  }
};
