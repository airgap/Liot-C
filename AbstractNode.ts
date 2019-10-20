export interface AbstractNode {
    id: string,
    accessor: string,
    sources?: any[],
    operator?: string,
    value?: any
}