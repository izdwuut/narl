import { NameComponent } from "../../components/display/NameComponent";
import { PantsComponent } from "../../components/eq/PantsComponent";
import { EqSlotEntity } from "./EqSlotEntity";

export class PantsSlotEntity extends EqSlotEntity {
  constructor() {
    const name = new NameComponent({ name: "Pants" });
    const pants = new PantsComponent();
    super({ components: [pants, name] });
  }
}
