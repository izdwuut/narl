import { immerable } from "immer";
import { getId } from "../../utils/getId";
import type { Component } from "./Component";
import type { Unique } from "./Unique";
import type { Constructor } from "./Constructor";

export type EntityClass<T extends Entity> = Constructor<T>;
export type EntityProps = {
  components?: Component[];
  entities?: Entity[];
};

export abstract class Entity implements Unique {
  [immerable] = true;
  id = "";
  components: Component[] = [];
  entities: Entity[] = [];

  constructor(props: EntityProps) {
    this.id = getId();
    Object.assign(this, {
      entities: props?.entities ?? [],
      components: props?.components ?? [],
    });
  }
}
