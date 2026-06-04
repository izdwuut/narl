import { type EntityProps } from "../../../../core/ecs/Entity";
import { DEFAULT_BACKPACK_SIZE } from "../../../../utils/constants";
import { NameComponent } from "../../components/NameComponent";
import { ContainerComponent } from "../../components/ContainerComponent";
import { DmgComponent } from "../../components/DmgComponent";
import { EquippableComponent } from "../../components/EquippableComponent";
import { SizeComponent } from "../../components/SizeComponent";
import { ItemEntity } from "./ItemEntity";
import { GlyphComponent } from "../../components/GlyphComponent";
import { MainHandComponent } from "../../components/eq/MainHandComponent";
import { NestDepthComponent } from "../../components/NestDepthComponent";
import type { Component } from "../../../../core/ecs/Component";
import { addComponents } from "../../../../core/ecs/queries/component";
import { RNG } from "../../../systems/rng/rng";
import { PickupableComponent } from "../../components/PickupableComponent";

export type BackpackEntityProps = {
  size?: number;
  name?: string;
  dmg?: number;
} & EntityProps;

const BACKPACK_ENTITY_NAME = "Backpack";

export class BackpackEntity extends ItemEntity {
  constructor(props: BackpackEntityProps = {}) {
    const components = [
      new NameComponent({ name: props?.name ?? BACKPACK_ENTITY_NAME }),
      new GlyphComponent({ glyph: "*" }),
      new ContainerComponent(),
    ];
    super({
      components: [...(props.components ?? []), ...components],
      entities: props.entities ?? [],
    });
  }
}

export class BackpackEntityFactory {
  private static getBase(): BackpackEntity {
    const backpack = new BackpackEntity();

    return backpack;
  }

  static getPlayerBackpack(): BackpackEntity {
    const backpack = this.getBase();

    const size = new SizeComponent({
      size: DEFAULT_BACKPACK_SIZE,
    });
    addComponents(backpack, size);

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

    return backpack;
  }
}
