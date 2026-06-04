import { produce } from "immer";
import type { Entity } from "../../../core/ecs/Entity";
import {
  upsertComponents
} from "../../../core/ecs/queries/component";
import { getEntityById } from "../../../core/ecs/queries/entities";
import { COLORS } from "../../../utils/colors";
import { ColorComponent } from "../../model/components/ColorComponent";
import { CursedComponent } from "../../model/components/CursedComponent";
import { DmgComponent } from "../../model/components/DmgComponent";
import { DmgModComponent } from "../../model/components/DmgModComponent";
import { EquippableComponent } from "../../model/components/EquippableComponent";
import { getPlayerEntity } from "../../state/selectors/player";
import type { GameState } from "../../state/state";
import { Action } from "../actions/action";
import type { ActionResolution } from "../actions/types";
import { getBackpack, isContainer } from "../inv/containers";
import { getItemName } from "../inv/items";
import { RNG } from "../rng/rng";
import type { WorldCurseItemAction } from "../world/types";
import { isCursed } from "./curse";

const curseItem = (item: Entity) => {
  const components = [new CursedComponent(), new ColorComponent({ color: COLORS.CURSED })];
  if (isContainer(item)) {
    components.push(
      new DmgModComponent({ dmgMod: 0.5 }),
      new EquippableComponent(),
      new DmgComponent({ dmg: RNG.items.range(1, 3) })
    );
  }
  upsertComponents(item, ...components);
};

export const resolveCurseItemAction = (
  state: GameState,
  gameAction: WorldCurseItemAction,
): ActionResolution => {
  const { itemId } = gameAction;
  const action = new Action(gameAction);
  const nextState = produce(state, (draft) => {
    const player = getPlayerEntity(draft);
    const backpack = getBackpack(player);
    if (!backpack) {
      throw new Error("No player backpack");
    }
    const itemToCurse = getEntityById(backpack, itemId);
    if (!itemToCurse) {
      throw new Error("No item to curse");
    }
    if (isCursed(itemToCurse)) {
      return;
    }

    const logMsg = `${getItemName(itemToCurse)} got cursed`;
    curseItem(itemToCurse);
    return action.success(logMsg);
  });

  return action.resolve(nextState);
};
