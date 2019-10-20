import {LogicNode} from "./LogicNode";
import {Node} from "./Node";

export class NandNode extends LogicNode {
    operator = 'Nand';

    /*
    Not
    And
    ...
     */
    descriptor = (n: number) => n ? 'And' : 'Not';

    /* Return false if all sources evaluate to true; otherwise return true */
    action = (resolver: (node: Node | string) => any) => !this.reduce((a: any, b: any) => a && b)(resolver);
}