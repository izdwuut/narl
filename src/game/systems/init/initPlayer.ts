import { INITIAL_PLAYER_POSITION } from "../../../utils";
import { PlayerEntity } from "../../model/entities/PlayerEntity";
import type { PlayerState } from "../../state/state";

export const initPlayer = (): PlayerState => {
    return {
        player: new PlayerEntity(),
        position: INITIAL_PLAYER_POSITION
    }
}