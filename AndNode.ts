import {LogicNode} from "./LogicNode";

export class AndNode extends LogicNode {
    operator = 'And';

    /*
    This
    And
    ...
     */
    descriptor = (n: number) => n ? 'And' : 'This';

    /* If all are true, return true; otherwise, return false */
    action = this.reduce((a: any, b: any) => a && b);
}