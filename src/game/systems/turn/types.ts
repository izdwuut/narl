export enum Direction {
  LEFT,
  RIGHT,
}

export enum GameActionType {
  MOVE = "move",
  PICK_UP = "pick_up",
  EQUIP_ITEM = "equip_item",
}

export type InvSlot = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type EqSlot = 1;

export type GameAction =
  | { type: GameActionType.MOVE; direction: Direction }
  | { type: GameActionType.PICK_UP }
  | {
      type: GameActionType.EQUIP_ITEM;
      invSlot: InvSlot;
      eqSlot: EqSlot;
    };

export type ActionResolution<TGameState> = {
  nextState: TGameState;
  consumesTurn: boolean;
};
