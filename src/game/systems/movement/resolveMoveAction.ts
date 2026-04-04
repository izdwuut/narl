import { cloneDeep } from "lodash";
import { getComponentByType } from "../../../core/ecs/queries/component";
import { INITIAL_PLAYER_POSITION } from "../../../utils/constants";
import type { GameState } from "../../state/state";
import type { ActionResolution, Direction } from "../turn";
import { getNextPlayerPosition } from "./getNextPlayerPosition";
import { PositionComponent } from "../../model/components/PositionComponent";
import { addLog } from "../log/addLog";

export function resolveMoveAction(
    state: GameState,
    direction: Direction
): ActionResolution<GameState> {
    const defaultActionResolution = {
        nextState: state,
        consumesTurn: false,
    };

    const playerRenderableComponent = getComponentByType(state.world.player, PositionComponent);
    if (!playerRenderableComponent) {
        return defaultActionResolution
    }
    const currentPosition = playerRenderableComponent.position ?? INITIAL_PLAYER_POSITION;

    const nextPosition = getNextPlayerPosition({
        currentPosition,
        direction,
        tilesCount: state.world.tiles.length,
    });

    if (nextPosition === null) {
        defaultActionResolution.nextState = addLog(state, {
            message: "Cannot move in that direction.",
            turn: state.turn
        });
        return defaultActionResolution;
    }

    const nextPlayerEntity = cloneDeep(state.world.player);
    const nextPositionComponent = getComponentByType(nextPlayerEntity, PositionComponent);
    if (nextPositionComponent) {
        nextPositionComponent.position = nextPosition;
    }

    const nextState = addLog({
        ...state,
        world: {
            ...state.world,
            player: nextPlayerEntity,
        },
    }, {
        message: "Player moved.",
        turn: state.turn
    });

    return {
        nextState,
        consumesTurn: true,
    };
}