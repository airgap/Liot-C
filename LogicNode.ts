import {Node} from "./Node";

export class LogicNode extends Node {

    // A list of raw data or ID references to other nodes
    // Only present in logic nodes
    public sources: any[] = [];

    // The mathematical, logical, or branching operator
    // Only present in logic nodes
    public operator: string = 'void';

    // Retrieve the descriptor for a source by its index
    descriptor: Function = (n: number) => '';

    // Resolve the node's sources then perform an action on each source in turn to compute the final value
    reduce = (reducer: any) => (resolver: (node: Node | string) => any) => this.sources.map(resolver).reduce(reducer);

    constructor(...sources: any[]) {
        super();
        this.sources = sources.map(s => s instanceof Node ? s.id : s);
    }

    // The function used to calculate the node's value from its sources
    action: (resolver: (node: Node | string) => any) => any =
            (resolver: (node: Node | string) => any) => null;

    // Compute the action and invert the result
    inverted = (action: (node: Node | string) => any) => !this.action(action);
}