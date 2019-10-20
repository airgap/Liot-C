import {LogicNode} from "./LogicNode";
import {Node} from "./Node";

export class MoreThanOrEqualToNode extends LogicNode {
    operator = 'Nunder';

    /*

    >=
    ...
     */
    descriptor = (n: number) => n ? '>=' : '';

    /* Return true if number are descending order; otherwise return false */
    action = (resolver: (node: Node | string) => any) => {

        // Get the values associated with the node's sources
        let values = <number[]>this.sources.map(resolver);

        // Confirm each number is smaller than or equal to the last
        for (let p = 1; p < values.length; p++)
            if (values[p - 1] < values[p])
                return false;
        return true;
    };
}