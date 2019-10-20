import {LogicNode} from "./LogicNode";

export class AddNode extends LogicNode {
    operator = 'Add';

    /*

    +
    ...
     */
    descriptor = (n: number) => n ? '+' : '';

    /* Add or append each source to the last */
    action = this.reduce((a: any, b: any) => a + b);
}