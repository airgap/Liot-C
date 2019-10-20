import {LogicNode} from "./LogicNode";
import {Node} from "./Node";

export class NorNode extends LogicNode {
    operator = 'Nor';

    /*
    Not
    Nor
    ...
     */
    descriptor = (n: number) => n ? 'Nor' : 'Not';

    /* Return false if any source evaluates to true; otherwise return true */
    action = (resolver: (node: Node | string) => any) => !this.reduce((a: any, b: any) => a || b)(resolver);
}