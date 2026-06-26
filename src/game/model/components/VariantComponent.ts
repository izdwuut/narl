import { Component } from "../../../core/ecs/Component";

type VariantComponentProps<T> = {
  variant: T;
};

export class VariantComponent<T> extends Component {
  variant: T;

  constructor(props: VariantComponentProps<T>) {
    super();
    this.variant = props.variant;
  }
}
