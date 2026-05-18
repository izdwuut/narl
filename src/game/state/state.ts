import { FloorEntity } from "../model/entities/FloorEntity";
import { ItemEntity } from "../model/entities/items/ItemEntity";
import type { MobEntity } from "../model/entities/mobs/MobEntity";
import { PlayerEntity } from "../model/entities/PlayerEntity";
import type { LogEntry } from "../systems/log/types";

export type Tile = {
  floor: FloorEntity;
  player?: PlayerEntity;
  items: ItemEntity[];
  mobs: MobEntity[];
};

export type WorldState = Tile[];

export type GameState = {
  initialized: boolean;
  world: WorldState;
  turn: number;
  log: LogEntry[];
};

export const getInitialState = (): GameState =>
  ({ initialized: false }) as GameState;
