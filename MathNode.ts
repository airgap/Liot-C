import {LogicNode} from "./LogicNode";
import {Node} from "./Node";
const mather = require('math-expression-evaluator');

export class MathNode extends LogicNode {
    operator = 'Math';

    /*
    expr
    [1]
    [2]
    [3]
    ...
    [n]
     */
    descriptor = (n: number) => n ? `[${n}]` : 'expr';

    constructor(expression: string, ...sources: any[]) {
        super();
        this.sources = [expression, ...(sources.length ? sources : (expression.match(/([A-Z]{5}-){4}[A-Z]{5}/g) || []))];
    }

    // Evaluate a complex mathematical equation
    action = (resolver: (node: Node | string) => any) => {

        // Get the values associated with the node's sources
        let values = this.sources.map(resolver),

        // Treat the first value as a mathematical equation
            expr = values.splice(0,1)[0].toString();

        // Replace any IDs in the expression with the associated nodes' values
        // Replace any [n]umbers with the associate source node's value
        (expr.match(/([A-Z]{5}-){4}[A-Z]{5}/g)||[]).forEach((v: string, k: number) => expr = expr.split(v).join(`[${k+1}]`));
        values.forEach((v, k) => expr = expr.replace(`[${Number(k)+1}]`, v.toString()));

        // Evaluate the expression and return the result
        return mather.eval(expr);
    };
}