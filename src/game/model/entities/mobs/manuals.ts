import type { EntityClass } from "../../../../core/ecs/Entity";
import type { Manual } from "../../Manual";
import type { MobEntity } from "./MobEntity";
import { RageBaitEntity } from "./rageBait/RageBaitEntity";
import { RageBaitEntityManual } from "./rageBait/RageBaitEntityManual";

export const MOB_MANUALS = new Map<EntityClass<MobEntity>, Manual<MobEntity>>([
  [RageBaitEntity, RageBaitEntityManual],
]);
