import type { EntityProps } from "../../../../../core/ecs/Entity";
import { GlyphComponent } from "../../../components/display/GlyphComponent";
import { NameComponent } from "../../../components/display/NameComponent";
import { ItemEntity } from "../ItemEntity";

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