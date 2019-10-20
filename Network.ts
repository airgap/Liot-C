import {Listener} from "./Listener";
import {LogicNode} from "./LogicNode";
import {IngestNode} from "./IngestNode";
import {Node} from "./Node";

export class Network {

    // Holds the network's nodes
    public nodes: Node[] = [];

    // Holds anything listening for data flow
    public listeners: Listener[] = [];

    constructor(...nodes: Node[]) {
        this.addNodes(...nodes);
    }

    // Refresh any nodes and listeners chained to a node
    refreshNodeValue: (node: Node | string) => void = (node: Node | string) => {

        // Get the node associated with the provided id if necessary
        if(!(node instanceof Node)) node = this.getNode(node);

        // Return false if the node doesn't exist
        if(!node)return false;

        // Retrieve any nodes chained to the node
        let listenables = [node, ...this.searchForReferrersTo(node.id)];

        // Retrieve any listeners attached to those nodes
        let listeners = this.searchForListenersTo(listenables);

        // Push an update to those listeners
        this.updateListeners(listeners);

        // Success
        return true;
    };

    // Search for nodes that rely on a specific node directly or indirectly
    // Barely tested newer function
    searchForReferrersTo: (id: string) => string[]  = id => {

        // Find all unique nodes that refer to a specified node
        return this.flatten([...new Set(this.nodes.filter((n: Node) =>n instanceof LogicNode && n.sources.includes(id)))]

            // Recursively find all nodes referencing them
            .map(n => [n, ...this.searchForReferrersTo(n.id)]));
    };

    flatten: (array: any[]) => any[] =
             (array: any[]) => {
        let flattened: any[] = [];
        array.forEach(el => flattened.push(...(Array.isArray(el) ? this.flatten(el) : [el])));
        return flattened;
    };

    // Search for listeners bound to specified nodes
    searchForListenersTo: (nodes: (Node|string)[]) => Listener[] = (nodes: (Node|string)[]) => {
        const ids = nodes.map(n=>n instanceof Node ? n.accessor : n);

        // This for some reason worked when .includes was .indexOf
        // Should probably figure out why
        return this.listeners.filter(n=>ids.includes(n.accessor));
    };

    // Send any new data to specified listeners
    updateListeners: (listeners: Listener[]) => void = listeners => {

        // Iterate over each listener
        listeners.forEach((listener: Listener) => {

            // Retrieve the node the listener listens to
            let node = this.accessNode(listener.accessor);
            if(node) {

                // Get the node's value
                let value = this.getNodeValue(node);

                // Perform the listener's action with the node's value
                listener.action(value);
            }
        });
    };

    // Get the value of a node
    getNodeValue: (node: Node | string) => any = (node: Node | string) => {

        // If `node` is a valid identifier, retrieve the associated node
        if(typeof node === "string" && node.match(/^([A-Z]{5}-){4}[A-Z]{5}$/)) node = this.getNode(node);
        //if(!node)return null;
        //console.log('getting node value', id, node, node instanceof LogicNode);
        return node
            ? node instanceof Node ?
                node instanceof LogicNode
                    // If it's a logic node, return the result of its action
                    ? node.action(this.getNodeValue)
                    // Otherwise assume it's an ingest node and return its value
                    : (<IngestNode>node).value
                // If it's anything else, return it raw
                : node
            : node;
    };

    // Send data to an ingest node
    send: (node: IngestNode | string | null, value: any) => boolean = (node: IngestNode | string | null, value: any) => {

        // If `node` is a string, retrieve a node using the string as an accessor.
        if(typeof node === 'string') node = this.accessNode(node);

        // Check to ensure the retrieval was successful and the retrieved node is an ingest node
        if(node instanceof IngestNode) {

            // Set the node's value
            node.value = value;

            // Update any nodes and listeners affected by the update
            this.refreshNodeValue(node.id);

            // Success
            return true;
        }

        // Return unsuccessful if the node isn't viable
        return false;
    };

    // Add a listener to the network
    addListener: (listener: Listener) => void = (listener: Listener) => {

        // Add the listener to the network's list of listeners
        this.listeners.push(listener);
    };

    // Retrieve a node from the network by its id
    getNode: (id: string) => Node = (id: string) => this.nodes.filter(n => n.id === id)[0];

    // Add multiple nodes to the network
    addNodes: (...nodes: Node[]) => void = (...nodes: Node[]) => nodes.forEach(n=>this.addNode(n));

    // Retrieve a node from the network by its accessor
    accessNode: (accessor: string) => Node | null = (accessor: string) => this.nodes.filter(n => n.accessor === accessor)[0] || null;

    // Remove a listener from the network
    silence: (listener: Listener) => boolean = listener => {

        // Get the index of a listener in the listener list
        let pos = this.listeners.indexOf(listener);

        // Splice the array around the index and return the removed element if one is removed
        return !!(pos >=0 ? this.listeners.splice(pos, 1) : 0);
    };

    // Add a node to the network
    addNode: (node: Node) => void = (node: Node) => {

        // Add the node to the list of nodes
        this.nodes.push(node);

        // Register this network to the node
        node.network = this;
    };
}