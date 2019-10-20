export interface AbstractNode {

    // Used by nodes to reference other nodes
    id: string

    // Used to send/receive data to/from outside the network
    // Accessors can be recycled without affecting how nodes reference each other
    accessor: string

    // A list of raw data or ID references to other nodes
    // Only present in logic nodes
    sources?: any[]

    // The mathematical, logical, or branching operator
    // Only present in logic nodes
    operator?: string

    // The node's current value
    // Only present in ingest nodes
    value?: any
}