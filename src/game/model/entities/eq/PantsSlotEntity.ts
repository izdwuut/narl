import { PantsComponent } from "../../components/eq/PantsComponent";
import { EqSlotEntity } from "./EqSlotEntity";

export class PantsSlotEntity extends EqSlotEntity {
  constructor() {
    const pants = new PantsComponent();
    super({ components: [pants] });
  }
}
