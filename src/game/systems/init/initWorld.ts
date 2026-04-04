import { INITIAL_PLAYER_POSITION, MAP_SIZE } from "../../../utils/constants";
import { getDummyArray } from "../../../utils/getDummyArray";
import { BackpackEntity } from "../../model/entities/BackpackEntity";
import { FloorEntity } from "../../model/entities/FloorEntity";
import { SwordEntity } from "../../model/entities/items/Sword";
import { PlayerEntity } from "../../model/entities/PlayerEntity";
import type { WorldState } from "../../state/state";

// World could be of type EntityMap[] - each map would
// contain floor, player, items, monsters etc.
export const initWorld = (): WorldState => {
    return {
        tiles: getDummyArray(MAP_SIZE).map((_, position) => new FloorEntity({ position })),
        player: new PlayerEntity({
            position: INITIAL_PLAYER_POSITION, entities: [
                new BackpackEntity(),
            ]
        }),
        items: [new SwordEntity({ position: 3 })],
    }
}