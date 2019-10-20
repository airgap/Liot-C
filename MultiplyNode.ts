import {LogicNode} from "./LogicNode";

export class MultiplyNode extends LogicNode {
    operator = 'Mult';

    /*
    This
    *
    ...
     */
    descriptor = (n: number) => n ? '*' : 'This';

    /* Multiply each source by the next */
    action = this.reduce((a: number, b: number) => a * b);
}