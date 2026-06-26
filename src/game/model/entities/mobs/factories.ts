import type { EntityClass } from "../../../../core/ecs/Entity";
import type { Factory } from "../../Factory";
import type { MobEntity } from "./MobEntity";
import { RageBaitEntity } from "./rageBait/RageBaitEntity";
import { RageBaitEntityFactory } from "./rageBait/RageBaitEntityFactory";

export const MOB_FACTORIES = new Map<EntityClass<MobEntity>, Factory<MobEntity>>([
  [RageBaitEntity, RageBaitEntityFactory],
]);