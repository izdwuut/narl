import type { Component } from "../../../../../core/ecs/Component";
import { addComponents, upsertComponents } from "../../../../../core/ecs/queries/component";
import { addEntities } from "../../../../../core/ecs/queries/entities";
import { COLORS } from "../../../../../utils/colors";
import { getDummyArray } from "../../../../../utils/getDummyArray";
import { RNG } from "../../../../systems/rng/rng";
import { NestDepthComponent } from "../../../components/containers/NestDepthComponent";
import { SizeComponent } from "../../../components/containers/SizeComponent";
import { ColorComponent } from "../../../components/display/ColorComponent";
import { EquippableComponent } from "../../../components/eq/EquippableComponent";
import { MainHandComponent } from "../../../components/eq/MainHandComponent";
import { CursedComponent } from "../../../components/items/CursedComponent";
import { DmgComponent } from "../../../components/items/DmgComponent";
import { DmgModComponent } from "../../../components/items/DmgModComponent";
import { DroppableComponent } from "../../../components/items/DroppableComponent";
import { PickupableComponent } from "../../../components/items/PickupableComponent";
import { isCursed } from "../../../queries/curse";
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

  static curse(item: BackpackEntity): boolean {
    const wasCursed = isCursed(item);
    if (wasCursed) {
      return false;
    }
    const components = [
      new CursedComponent(),
      new ColorComponent({ color: COLORS.CURSED }),
      new DmgModComponent({ dmgMod: 0.5 }),
      new EquippableComponent(),
      new DmgComponent({ dmg: RNG.items.range(1, 3) }),
    ];

    upsertComponents(item, ...components);
    return true;
  }

  static shouldBeCursed(item: BackpackEntity): boolean {
    return !!item;
  }
}
