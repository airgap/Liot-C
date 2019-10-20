import {LogicNode} from "./LogicNode";
import {Node} from "./Node";

export class MoreThanNode extends LogicNode {
    operator = 'Over';

    /*

    >
    ..
     */
    descriptor = (n: number) => n ? '>' : '';


    /* Return true if number are non-repeating descending order; otherwise return false */
    action = (resolver: (node: Node | string) => any) => {

        // Get the values associated with the node's sources
        let values = <number[]>this.sources.map(resolver);

        // Confirm each number is less than the last
        for (let p = 1; p < values.length; p++)
            if (values[p - 1] <= values[p])
                return false;
        return true;
    };
}