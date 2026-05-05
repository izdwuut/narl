import { ExpComponent } from "../../components";
import { HpComponent } from "../../components/HpComponent";
import { MobEntity } from "./MobEntity";

export class RageBaitEntity extends MobEntity {
  constructor() {
    const hp = new HpComponent({ hp: 10 });
    const exp = new ExpComponent({ exp: 20 });
    super({
      name: "Rage Bait",
      glyph: "b",
      components: [hp, exp],
    });
  }
}
