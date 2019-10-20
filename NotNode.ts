import {LogicNode} from "./LogicNode";
import {Node} from "./Node";

export class NotNode extends LogicNode {
    operator = 'Not';

    /*
    Not
     */
    descriptor = (n: number) => 'Not';

    constructor(source?: any) {
        super();
        this.sources = [source];
    }

    // Return the opposite of the source
    action = (resolver: (node: Node | string) => any) => !this.sources.map(resolver)[0];
}