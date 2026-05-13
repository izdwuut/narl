import { Entity, type EntityProps } from "../../../../core/ecs/Entity";

type EqSlotEntityProps = EntityProps;

export abstract class EqSlotEntity extends Entity {
  constructor(props: EqSlotEntityProps) {
    super(props);
  }
}
