import { MAP_SIZE } from "../../../utils/constants";
import { getDummyArray } from "../../../utils/getDummyArray";
import { VisitedComponent } from "../../model/components/VisitedComponent";
import { FloorEntity } from "../../model/entities/FloorEntity";
import { SwordEntity } from "../../model/entities/items/SwordEntity";
import { RageBaitEntity } from "../../model/entities/mobs/RageBait";
import type { WorldState } from "../../state/state";

export const initWorld = (): WorldState => {
  const world: WorldState = getDummyArray(MAP_SIZE).map((_, position) => ({
    floor: new FloorEntity(),
    player: undefined,
    items: [],
    mobs: [],
    position,
  }));
  world[3].items.push(new SwordEntity());
  world[0].floor.components.push(new VisitedComponent());
  world[5].mobs.push(new RageBaitEntity());
  world[6].mobs.push(new RageBaitEntity());
  world[7].mobs.push(new RageBaitEntity());
  return world;
};
