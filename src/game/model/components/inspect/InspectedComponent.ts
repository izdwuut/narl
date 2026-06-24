import { Component } from "../../../../core/ecs/Component";
import { DEFAULT_INSPECTED_TIMES } from "../../../../utils";

export class InspectedComponent extends Component {
  times: number = DEFAULT_INSPECTED_TIMES;

  constructor() {
    super();
  }
}
