import { MainHandComponent } from "../../components";
import { EqSlotEntity } from "./EqSlotEntity";

export class MainHandSlotEntity extends EqSlotEntity {
  constructor() {
    const mainHand = new MainHandComponent();
    super({ components: [mainHand] });
  }
}
