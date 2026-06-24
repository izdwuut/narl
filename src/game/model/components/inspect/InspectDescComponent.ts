import { Component } from "../../../../core/ecs/Component";

type InspectDescComponentProps = {
  times: number;
  text: string;
};
export class InspectDescComponent extends Component {
  times = 0;
  text = "";

  constructor(props: InspectDescComponentProps) {
    super();
    Object.assign(this, props);
  }
}
