import { MAP_SIZE } from "../../../utils";
import { Direction } from "../turn/types";


type GetNextPlayerPositionParams = {
    currentPosition: number;
    direction: Direction;
};

export const getNextPlayerPosition = ({
    currentPosition,
    direction,
}: GetNextPlayerPositionParams): number | null => {
    const delta = direction === Direction.LEFT ? -1 : 1;
    const nextPosition = currentPosition + delta;

    if (nextPosition < 0 || nextPosition >= MAP_SIZE) {
        return null;
    }

    return nextPosition;
}