import { Component } from "../../../core/ecs/Component";

export type SizeComponentProps = {
    size: number;
}

export class SizeComponent extends Component { 
    constructor(props: SizeComponentProps) {
        super();
        Object.assign(this, props);
    }
}
