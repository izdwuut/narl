import { Entity, type EntityProps } from "../../../core/ecs/Entity";
import { DEFAULT_BACKPACK_SIZE } from "../../../utils/constants";
import { SizeComponent } from "../components/CapacityComponent";

export type BackpackEntityProps = {
    size?: number;
} & EntityProps;

// in the future it may be needed to make it extend some generic ContainerComponent
export class BackpackEntity extends Entity {
    constructor(props: BackpackEntityProps = {}) {
        const size = new SizeComponent({
            size: props.size ?? DEFAULT_BACKPACK_SIZE,
        });
        super({ components: [size] });
    }
}
