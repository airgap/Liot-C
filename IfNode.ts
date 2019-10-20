import {LogicNode} from "./LogicNode";
import {Node} from "./Node";

export class IfNode extends LogicNode {
    operator = 'If';

    /*
    If
    Then
    Else
     */
    descriptor = (n: number) => ['If', 'Then', 'Else'][n];

    // If n0 is true, then do n1, else do n2
    action = (resolver: (node: Node | string) => any) => {
        const [c, t, e] = this.sources.map(resolver);
        return c ? t : e;
    };
    constructor(ifCondition: (string | Node), ifThen: (string | Node), ifElse: (string | Node)) {
        super();

        // Map the three provided nodes to their associated sources
        this.sources = [ifCondition, ifThen, ifElse].map(s => s instanceof Node ? s.id : s);
    }
}