import { MainHandSlotEntity } from ".";
import { Entity, type EntityProps } from "../../../../core/ecs/Entity";

export type EqEntityProps = {
  items?: Entity[];
} & EntityProps;

export class EqEntity extends Entity {
  constructor(props?: EqEntityProps) {
    const mainHandSlot = new MainHandSlotEntity();

    super({
      entities: [...(props?.items ?? []), mainHandSlot],
    });
  }
}
