
import { ExpComponent } from "../../components/ExpComponent";
import { HpComponent } from "../../components/HpComponent";
import { PickupableComponent } from "../../components/PickupableComponent";
import { BackpackEntity } from "../items/BackpackEntity";
import { SwordEntity } from "../items/SwordEntity";
import { MobEntity } from "./MobEntity";

export class RageBaitEntity extends MobEntity {
  constructor() {
    const hp = new HpComponent({ hp: 10 });
    const exp = new ExpComponent({ exp: 20 });
    const container = new BackpackEntity({
      dmg: 1,
      components: [new PickupableComponent()],
      entities: [new SwordEntity()],
    });

    super({
      name: "Rage Bait",
      glyph: "r",
      components: [hp, exp],
      entities: [container],
    });
  }
}
