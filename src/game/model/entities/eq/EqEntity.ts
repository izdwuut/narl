import { Entity, type EntityProps } from "../../../../core/ecs/Entity";
import { MainHandSlotEntity } from "./MainHandSlotEntity";

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
