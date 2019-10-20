import {Node} from './Node';
export class Listener {

    // The accessor of the node to listen to
    public accessor: string;

    // The function to execute when the node updates
    public action: Function;
    
    constructor(node: Node | string, action?: Function) {
        this.accessor = node instanceof Node ? node.accessor : node;
        this.action = action || (() => null);
    };
}