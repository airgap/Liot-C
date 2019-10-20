import {LogicNode} from "./LogicNode";

export class OrNode extends LogicNode {
    operator = 'Or';

    /*
    This
    Or
    ...
     */
    descriptor = (n: number) => n ? 'Or' : 'This';

    /* Return true if any source is true; otherwise return false */
    action = this.reduce((a: any, b: any) => a || b);
}