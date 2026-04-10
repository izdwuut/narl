import { getComponentByType } from "../../core/ecs/queries/component";
import { getEntitiesByType } from "../../core/ecs/queries/entities";
import { usePlayer } from "../../game/hooks/usePlayer";
import { SizeComponent } from "../../game/model/components/SizeComponent";
import { ItemEntity } from "../../game/model/entities/items/ItemEntity";
import { getDummyArray } from "../../utils/getDummyArray";
import { Slot } from "./Slot";

export const Inventory = () => {
  const { getPlayerBackpack } = usePlayer();
  const backpack = getPlayerBackpack();
  const backpackSize = getComponentByType(backpack, SizeComponent)?.size ?? 0;
  const items = getEntitiesByType(backpack, ItemEntity);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {getDummyArray(backpackSize).map((_, index) => {
        const item = items[index];
        return <Slot key={item?.id ?? `empty-${index}`} item={item} />;
      })}
    </div>
  );
};
