// game/systems/input/mapKeyboardEventToAction.ts
import type { RefObject } from "react";
import {
  Direction,
  GameActionType,
  type GameAction,
  type InvSlot,
} from "../../turn";
import type { GameState } from "../../../state";
import { addLogImmutable } from "../../log";

export const mapKeyboardEventToAction = (
  event: KeyboardEvent,
  buffer: RefObject<string[]>,
  gameState: GameState,
  setGameState: (gameState: GameState) => void,
): GameAction | undefined => {
  if (buffer.current.length) {
    if (event.key === "Escape") {
      buffer.current = [];
    }
    if (buffer.current[0] === "e") {
      if (!["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(event.key)) {
        setGameState(addLogImmutable(gameState, "Equip action in progress"));
        return;
      }

      buffer.current = [];
      return {
        type: GameActionType.EQUIP_ITEM,
        invSlot: Number(event.key) as InvSlot,
        eqSlot: 1, // hardcoded for now
      };
    }
    return;
  }

  switch (event.key) {
    case "ArrowLeft":
      return { type: GameActionType.MOVE, direction: Direction.LEFT };
    case "ArrowRight":
      return { type: GameActionType.MOVE, direction: Direction.RIGHT };
    case "g":
    case "G":
      return { type: GameActionType.PICK_UP };
    case "e":
    case "E":
      buffer.current.push("e");
      setGameState(addLogImmutable(gameState, "Select item to equip (1-9)"));

      return;
    default:
      return undefined;
  }
};
