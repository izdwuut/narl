import { INITIAL_PLAYER_POSITION, MAP_SIZE } from "../../utils/constants";
import { getDummyArray } from "../../utils/getDummyArray";
import { FloorEntity } from "../model/entities/FloorEntity";
import { ItemEntity } from "../model/entities/items/ItemEntity";
import { SwordEntity } from "../model/entities/items/Sword";
import { PlayerEntity } from "../model/entities/PlayerEntity";
import { initWorld } from "../systems/init/initWorld";
import type { LogEntry } from "../systems/log";

export type WorldState = {
        tiles: FloorEntity[];
        player: PlayerEntity;
        items: ItemEntity[];
    }
export type GameState = {
    world: WorldState,
    turn: number;
    log: LogEntry[];
}

export const getInitialState = (): GameState => ({
    world: initWorld(),
    turn: 0,
    log: []
})