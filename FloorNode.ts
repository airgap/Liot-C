import {LogicNode} from "./LogicNode";
import {Node} from "./Node";

export class FloorNode extends LogicNode {
    operator = 'Nor';

    /*
    Value
     */
    descriptor = (n: number) =>'Value';
    constructor(...values: any[]) {
        super();
        this.sources = values;
    }

    // If there is one source, round down and return it
    // If there is 0 or 2+ sources, round down and return them as an array
    action = (resolver: (node: Node | string) => any) => {
        return this.sources.length != 1
            ? this.sources.map(resolver).map(n=>Math.floor(Number(n)))
            :Math.floor(Number(this.sources[0]));
    }
}