import {LogicNode} from "./LogicNode";

export class DivideNode extends LogicNode {
    operator = 'Divide';

    /*

    /
    ...
     */
    descriptor = (n: number) => n ? '/' : '';

    /* Divide each number by the next */
    action = this.reduce((a: number, b: number) => a / b);
}