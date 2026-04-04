export enum Direction {
    LEFT,
    RIGHT,
}

export enum GameActionType {
    MOVE = "move",
    PICK_UP = "pick_up",
}

export type GameAction =
    | { type: GameActionType.MOVE; direction: Direction }
    | { type: GameActionType.PICK_UP }

export type ActionResolution<TGameState> = {
    nextState: TGameState;
    consumesTurn: boolean;
};