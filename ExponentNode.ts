import {LogicNode} from "./LogicNode";

export class ExponentNode extends LogicNode {
    operator = 'Exp';

    /*
    Base
    Power
    ...
     */
    descriptor = (n: number) => n ? 'Power' : 'Base';

    /* Raise the base to each power in turn */
    action = this.reduce((a: number, b: number) => a ** b);
}