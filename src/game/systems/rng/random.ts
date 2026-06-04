import seedrandom from "seedrandom";
import { NAMESPACE_SEPARATOR, RANDOM_TOTAL_CHANCE } from "../../../utils";

export type RandomContext = {
  namespace: string;
  seed: string;
};

export const getRandomContextNamespace = (namespaces: string[]): string => {
  return namespaces.join(NAMESPACE_SEPARATOR);
};

export class Random {
  rng: () => number;

  constructor(private readonly context: RandomContext) {
    this.rng = seedrandom(
      getRandomContextNamespace([this.context.seed + this.context.namespace]),
    );
  }

  random(): number {
    return this.rng();
  }

  chance(percent: number): boolean {
    return this.random() * RANDOM_TOTAL_CHANCE <= percent;
  }

  range(min: number, max: number): number {
    return Math.ceil(this.random() * (max - min + 1));
  }

  roll(): number {
    return this.range(1, 100)
  }
}
