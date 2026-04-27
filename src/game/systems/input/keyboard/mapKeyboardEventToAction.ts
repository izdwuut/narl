// game/systems/input/mapKeyboardEventToAction.ts
import {
  Direction,
  GameActionType,
  type GameAction,
  type InvSlot,
} from "../../turn";

export const mapKeyboardEventToAction = (
  event: KeyboardEvent,
): GameAction | undefined => {
  switch (event.key) {
    case "ArrowLeft":
      return { type: GameActionType.MOVE, direction: Direction.LEFT };
    case "ArrowRight":
      return { type: GameActionType.MOVE, direction: Direction.RIGHT };
    case "g":
    case "G":
      return { type: GameActionType.PICK_UP };
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      return {
        type: GameActionType.EQUIP_ITEM,
        invSlot: Number(event.key) as InvSlot,
        eqSlot: 1, // hardcoded for now
      };
    default:
      return undefined;
  }
};
