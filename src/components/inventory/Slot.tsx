import { getComponentByType } from "../../core/ecs/queries/component";
import { GlyphComponent } from "../../game/model/components/GlyphComponent";
import type { ItemEntity } from "../../game/model/entities/items/ItemEntity";

interface SlotProps {
  item?: ItemEntity;
}

export const Slot = ({ item }: SlotProps) => {
  const { glyph, color } = getComponentByType(item, GlyphComponent) ?? {};

  return (
    <div
      style={{
        backgroundColor: "black",
        height: "48px",
        width: "48px",
        border: "1px solid white",
        color: color,
      }}
    >
      {glyph ?? " "}
    </div>
  );
};
