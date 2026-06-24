import type { MobEntity } from "../../model/entities/mobs/MobEntity";
import type { Tile } from "../../state/state";

export const killMob = (mobs: MobEntity[]) => {
  mobs.splice(0, 1);
};

export const killMobById = (tile: Tile, id: string) => {
  tile.mobs = tile.mobs.filter((mob) => mob.id !== id);
};
