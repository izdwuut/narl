import type { ItemEntity } from "../../model";

export const pickUpItem = (items: ItemEntity[]): ItemEntity | undefined => {
  return items.at(-1);
};
