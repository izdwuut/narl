import type { MobEntity } from "../../model/entities/mobs/MobEntity";
import { RAGE_BAIT_NAME } from "../../model/entities/mobs/RageBait";
import { getMobFactory } from "./getMobFactory";
import { RNG } from "./rng";
import { getZone, Zone } from "./zones";

type SpawnTable = Record<string, number>;
const SPAWN_TABLE = {
  [Zone.START]: {},
  [Zone.EARLY]: {
    [RAGE_BAIT_NAME]: 15,
  },
  [Zone.LOW]: {},
  [Zone.MID]: {},
  [Zone.HIGH]: {},
  [Zone.LATE]: {},
  [Zone.FINAL]: {},
} satisfies Record<Zone, SpawnTable>;

const validateSpawnTable = (table: Record<string, number>): void => {
  const total = Object.values(table).reduce((sum, chance) => sum + chance, 0);

  if (total > 100) {
    throw new Error(`Spawn table exceeds 100%. Got ${total}%.`);
  }
};

const getSpawnTable = (zone: Zone): SpawnTable => {
  const table = SPAWN_TABLE[zone];
  validateSpawnTable(table);
  return table;
};

export const getRandomMob = (position: number): MobEntity | undefined => {
  const zone = getZone(position);
  const table = getSpawnTable(zone);

  let mob: MobEntity | undefined = undefined;
  const roll = RNG.mobs.roll();
  let current = 0;

  for (const [mobName, chance] of Object.entries(table)) {
    current += chance;
    if (roll <= current) {
      mob = getMobFactory(mobName).getDefault();
      break;
    }
  }

  return mob;
};
