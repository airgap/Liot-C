import {LogicNode} from "./LogicNode";

export class SubtractNode extends LogicNode {
    operator = 'Sub';

    /*
    This
    -
    ...
     */
    descriptor = (n: number) => n ? '-' : 'This';

    /* Subtract each source from the last */
    action = this.reduce((a: number, b: number) => a - b);
}