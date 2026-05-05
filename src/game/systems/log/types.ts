// TODO: recreate as entity (message, turn, stackable)
export type LogEntry = {
    message: string;
    turn: number;
}

export enum PendingActionType {
    Attack
}
export type PendingAction = {
    type: PendingActionType;
}