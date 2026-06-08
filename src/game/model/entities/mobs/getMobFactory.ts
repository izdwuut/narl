import type { Constructor } from "../../../../core/ecs/Constructor";
import type { Factory } from "../../../../core/ecs/Factory";
import type { MobEntity } from "./MobEntity";
import {
  RageBaitEntity,
  RageBaitEntityFactory
} from "./RageBait";

type MobClass = Constructor<MobEntity>;

const MOB_FACTORY = new Map<MobClass, Factory<MobEntity>>([
  [RageBaitEntity, RageBaitEntityFactory],
]);

export const getMobFactory = (mobClass: MobClass) => {
  const factory = MOB_FACTORY.get(mobClass);

  if (!factory) {
    throw new Error("Unknown mob class");
  }

  return factory;
};
