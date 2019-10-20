import {Node} from "./Node";

export class LogicNode extends Node {
    public sources: any[] = [];
    public operator: string = 'void';
    descriptor: Function = (n: number) => '';
    //resolver: Function;
    //resolveSources = values => values.map(this.resolver);
    reduce = (reducer: any) => (resolver: (node: Node | string) => any) => this.sources.map(resolver).reduce(reducer);

    constructor(...sources: any[]) {
        super();
        this.sources = sources.map(s => s instanceof Node ? s.id : s);
    }

    action: (resolver: (node: Node | string) => any) => any =
            (resolver: (node: Node | string) => any) => null;
    inverted = (action: (node: Node | string) => any) => !this.action(action);
}