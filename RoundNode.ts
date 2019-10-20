import {LogicNode} from "./LogicNode";
import {Node} from "./Node";

export class RoundNode extends LogicNode {
    operator = 'Nor';

    /*
    Value
    Digits
     */
    descriptor = (n: number) => n ? 'Digits' : 'Value';

    constructor(value?: any, digits?: any) {
        super();
        this.sources = [value, digits];
    }

    // Return a specified value rounded to a specified number of digits
    action = (resolver: (node: Node | string) => any) => {

        // Resolve the sources for the value and digits
        let [value, digits] = this.sources.map(resolver);

        // Round the value to the specified number of digits and return
        return Math.round(value * digits) / digits;
    }
}