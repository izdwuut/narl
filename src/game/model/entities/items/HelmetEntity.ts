import type { Component } from "../../../../core/ecs/Component";
import type { EntityProps } from "../../../../core/ecs/Entity";
import {
  addComponents,
  upsertComponents,
} from "../../../../core/ecs/queries/component";
import { COLORS } from "../../../../utils/colors";
import { RNG } from "../../../systems/rng/rng";
import { ColorComponent } from "../../components/display/ColorComponent";
import { GlyphComponent } from "../../components/display/GlyphComponent";
import { NameComponent } from "../../components/display/NameComponent";
import { HeadComponent } from "../../components/eq/HeadComponent";
import { PantsComponent } from "../../components/eq/PantsComponent";
import { InspectDescComponent } from "../../components/inspect/InspectDescComponent";
import { CursedComponent } from "../../components/items/CursedComponent";
import { DefComponent } from "../../components/items/DefComponent";
import { DroppableComponent } from "../../components/items/DroppableComponent";
import { PickupableComponent } from "../../components/items/PickupableComponent";
import { VariantComponent } from "../../components/VariantComponent";
import { isCursed } from "../../queries/curse";
import { getInspectedTimes } from "../../queries/inspect";
import { ItemEntity } from "./ItemEntity";

export type HelmetEntityProps = EntityProps;
export enum HelmetEntityVariants {
  HELMET = "Helmet",
  HORNED_HELMET = "Horned Helmet",
}

export class HelmetEntity extends ItemEntity {
  constructor(props?: HelmetEntityProps) {
    const glyph = new GlyphComponent({
      glyph: "H" as string,
    });
    const name = new NameComponent({ name: HelmetEntityVariants.HELMET });

    super({
      ...props,
      components: [...(props?.components ?? []), glyph, name],
    });
  }
}

export class HornedHelmetEntityFactory {
  private static addInspectDesc(item: HelmetEntity) {
    addComponents(
      item,
      new InspectDescComponent({ times: 5, text: "It has horns" }),
      new InspectDescComponent({ times: 10, text: "Looks horny" }),
    );
  }

  private static getBase(): HelmetEntity {
    const hornedHelmet = new HelmetEntity();
    this.addInspectDesc(hornedHelmet);

    return hornedHelmet;
  }

  static getDefault(): HelmetEntity {
    const hornedHelmet = this.getBase();

    const head = new HeadComponent();
    const def = new DefComponent({ def: RNG.items.range(3, 4) });
    const pickupable = new PickupableComponent();
    const droppable = new DroppableComponent();
    const variant = new VariantComponent({
      variant: HelmetEntityVariants.HELMET,
    });
    addComponents(
      hornedHelmet,
      ...([head, def, pickupable, droppable, variant] as Component[]),
    );

    return hornedHelmet;
  }

  static getHornedHelmet() {
    const helmet = this.getDefault();
    const variant = new VariantComponent({
      variant: HelmetEntityVariants.HORNED_HELMET,
    });
    const name = new NameComponent({ name: HelmetEntityVariants.HORNED_HELMET });
    upsertComponents(helmet, variant, name);
    return helmet;
  }

  static curse(item: HelmetEntity): boolean {
    const wasCursed = isCursed(item);
    if (wasCursed) {
      return false;
    }
    const components = [
      new CursedComponent(),
      new ColorComponent({ color: COLORS.CURSED }),
      new PantsComponent(),
    ];
    upsertComponents(item, ...components);
    return true;
  }

  static shouldBeCursed(item: HelmetEntity): boolean {
    const inspected = getInspectedTimes(item);
    return inspected >= 10;
  }
}
