import { Entity, type EntityProps } from "../../../../core/ecs/Entity";
import { MainHandSlotEntity } from ".";

export type EquipmentEntityProps = {
  items?: Entity[];
} & EntityProps;

export class EquipmentEntity extends Entity {
  constructor(props?: EquipmentEntityProps) {
    const mainHandSlot = new MainHandSlotEntity();

    super({
      entities: [...(props?.items ?? []), mainHandSlot],
    });
  }
}
