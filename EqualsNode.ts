import {LogicNode} from "./LogicNode";
import {Node} from "./Node";

export class EqualsNode extends LogicNode {
    operator = 'Equals';

    /*

    Equals
    ...
     */
    descriptor = (n: number) => n ? 'Equals' : '';

    /* Ensure all sources are equivalent */
    action = (resolver: (node: Node | string) => any) => {
        // Get the sources values
        const values = this.sources.map(resolver),

            // Cache the first value
            paramZero = values[0], l = values.length;

        // Compare every other array element to the cached first value
        for (let p = 1; p < l; p++)
            if (paramZero != values[p])
                return !1;
        return !0;
    };
}