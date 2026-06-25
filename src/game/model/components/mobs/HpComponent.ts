import { Component } from "../../../../core/ecs/Component";

export type HpComponentProps = {
  hp: number;
  maxHp?: number;
};

export class HpComponent extends Component {
  static DEFAULT_HP = 0;
  hp: number = HpComponent.DEFAULT_HP;
  static DEFAULT_MAX_HP = 0;
  maxHp: number = HpComponent.DEFAULT_MAX_HP;

  constructor(props: HpComponentProps) {
    super();
    Object.assign(this, props);
    this.maxHp ||= props.hp;
  }
}
