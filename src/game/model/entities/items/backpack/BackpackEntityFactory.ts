import type { Component } from "../../../../../core/ecs/Component";
import { addComponents } from "../../../../../core/ecs/queries/component";
import { addEntities } from "../../../../../core/ecs/queries/entities";
import { getDummyArray } from "../../../../../utils/getDummyArray";
import { RNG } from "../../../../systems/rng/rng";
import { NestDepthComponent } from "../../../components/containers/NestDepthComponent";
import { SizeComponent } from "../../../components/containers/SizeComponent";
import { MainHandComponent } from "../../../components/eq/MainHandComponent";
import { DroppableComponent } from "../../../components/items/DroppableComponent";
import { PickupableComponent } from "../../../components/items/PickupableComponent";
import { PlaceholderEntity } from "../PlaceholderItemEntity";
import { BackpackEntity } from "./BackpackEntity";

export class BackpackEntityFactory {
  private static getBase(): BackpackEntity {
    const backpack = new BackpackEntity();

    return backpack;
  }

  private static addPlaceholders(
    backpack: BackpackEntity,
    { size }: SizeComponent,
  ): void {
    const entities = getDummyArray(size).map(() => new PlaceholderEntity());
    addEntities(backpack, ...entities);
  }
  static getPlayerBackpack(size: number): BackpackEntity {
    const backpack = this.getBase();

    const sizeComponent = new SizeComponent({
      size,
    });
    addComponents(backpack, sizeComponent);
    this.addPlaceholders(backpack, sizeComponent);

    return backpack;
  }

  static getDefault(): BackpackEntity {
    const backpack = this.getBase();

    const size = new SizeComponent({
      size: RNG.items.range(2, 4),
    });

    const nestDepth = new NestDepthComponent({
      nestDepth: RNG.items.range(1, 2),
    });
    const mainHand = new MainHandComponent();
    const pickup = new PickupableComponent();
    addComponents(
      backpack,
      ...([size, nestDepth, mainHand, pickup] as Component[]),
    );
    this.addPlaceholders(backpack, size);

    return backpack;
  }

  static setDroppable(backpack: BackpackEntity): BackpackEntity {
    const droppable = new DroppableComponent();
    addComponents(backpack, droppable);
    return backpack;
  }
}
