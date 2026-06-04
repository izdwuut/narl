import { DEFAULT_SEED, MOBS_NAMESPACE_SEPARATOR } from "../../../utils";
import { Random } from "./random";

type RNGTypes = "mobs" | "items";
export type RNGMap = Record<RNGTypes, Random>;

export const RNG: RNGMap = {
  mobs: new Random({
    seed: DEFAULT_SEED,
    namespace: MOBS_NAMESPACE_SEPARATOR,
  }),
  items: new Random({
    seed: DEFAULT_SEED,
    namespace: MOBS_NAMESPACE_SEPARATOR,
  }),
};
