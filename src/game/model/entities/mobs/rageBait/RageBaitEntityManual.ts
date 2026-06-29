import {
  patchComponentByType
} from "../../../../../core/ecs/queries/component";
import type { GameState } from "../../../../state/state";
import type { Action } from "../../../../systems/actions/action";
import { isHostile } from "../../../../systems/attack/hostililty";
import { getEntityName } from "../../../../systems/inspect/getEntityName";
import { RNG } from "../../../../systems/rng/rng";
import { HostileComponent } from "../../../components/mobs/HostileComponent";
import { PeacefulComponent } from "../../../components/mobs/PeacefulComponent";
import type { RageBaitEntity } from "./RageBaitEntity";

export class RageBaitEntityManual {
  static onAfterTakeDamage(
    rageBait: RageBaitEntity,
    _gameState: GameState,
    gameAction: Action,
  ) {
    if (isHostile(rageBait) || !RNG.mobs.chance(50)) {
      return;
    }
    patchComponentByType(
      rageBait,
      PeacefulComponent,
      () => new HostileComponent(),
    );
    const name = getEntityName(rageBait);
    gameAction.info(`${name} is hostile`);
  }

  static poke(
    rageBait: RageBaitEntity,
    gameAction: Action,
  ) {
    const name = getEntityName(rageBait);

    if (isHostile(rageBait)) {
      gameAction.success(`You poked ${name}`);
      return;
    }

    gameAction.success(`You poked ${name}. It looks cute`);

    if (!RNG.mobs.chance(20)) {
      return;
    }
    patchComponentByType(
      rageBait,
      PeacefulComponent,
      () => new HostileComponent(),
    );
    gameAction.info(`${name} is hostile`);
  }
}
