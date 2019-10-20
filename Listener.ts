import {Node} from './Node';
export class Listener {
    public accessor: string;
    public action: Function;
    constructor(node: Node | string, action?: Function) {
        this.accessor = node instanceof Node ? node.accessor : node;
        this.action = action || (() => null);
    };
}