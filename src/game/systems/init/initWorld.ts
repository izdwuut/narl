import { INITIAL_PLAYER_POSITION, MAP_SIZE } from "../../../utils/constants";
import { getDummyArray } from "../../../utils/getDummyArray";
import { VisitedComponent } from "../../model/components/VisitedComponent";
import { FloorEntity } from "../../model/entities/FloorEntity";
import { SwordEntity } from "../../model/entities/items/Sword";
import type { WorldState } from "../../state/state";
import { initPlayer } from "./initPlayer";

export const initWorld = (): WorldState => {
  const world: WorldState = getDummyArray(MAP_SIZE).map(() => ({
    floor: new FloorEntity(),
    player: undefined,
    items: [],
  }));
  world[INITIAL_PLAYER_POSITION].player = initPlayer();
  world[3].items.push(new SwordEntity());
  world[0].floor.components.push(new VisitedComponent());

  return world;
};
