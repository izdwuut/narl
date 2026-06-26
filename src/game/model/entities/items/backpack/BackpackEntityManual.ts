import { upsertComponents } from "../../../../../core/ecs/queries/component";
import { COLORS } from "../../../../../utils/colors";
import { RNG } from "../../../../systems/rng/rng";
import { ColorComponent } from "../../../components/display/ColorComponent";
import { EquippableComponent } from "../../../components/eq/EquippableComponent";
import { CursedComponent } from "../../../components/items/CursedComponent";
import { DmgComponent } from "../../../components/items/DmgComponent";
import { DmgModComponent } from "../../../components/items/DmgModComponent";
import { isCursed } from "../../../queries/curse";
import { BackpackEntity } from "./BackpackEntity";

export class BackpackEntityManual {
  static curse(item: BackpackEntity): boolean {
    const wasCursed = isCursed(item);
    if (wasCursed) {
      return false;
    }
    const components = [
      new CursedComponent(),
      new ColorComponent({ color: COLORS.CURSED }),
      new DmgModComponent({ dmgMod: 0.5 }),
      new EquippableComponent(),
      new DmgComponent({ dmg: RNG.items.range(1, 3) }),
    ];

    upsertComponents(item, ...components);
    return true;
  }

  static shouldBeCursed(item: BackpackEntity): boolean {
    return !!item;
  }
}
