import {LogicNode} from "./LogicNode";
import {Node} from "./Node";

/*
Work in progress
 */
export class FilterNode extends LogicNode {
    operator = 'Filter';
    filter: any;
    descriptor = (n: number) => n ? `Source ${n}`:'Filter';
    action = (resolver: (node: Node | string) => any) => null; //this.reduce((a, b) => a && b);
}