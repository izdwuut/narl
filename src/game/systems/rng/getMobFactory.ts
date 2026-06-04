import type { Factory } from "../../../core/ecs/Factory";
import type { MobEntity } from "../../model/entities/mobs/MobEntity";
import {
  RAGE_BAIT_NAME,
  RageBaitEntityFactory
} from "../../model/entities/mobs/RageBait";

export const getMobFactory = (mobName: string): Factory<MobEntity> => {
  switch (mobName) {
    case RAGE_BAIT_NAME:
      return RageBaitEntityFactory;
    default:
      throw new Error(`Unknown mob name`);
  }
};
