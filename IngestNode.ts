import {Node} from "./Node";
import {Network} from "./Network";

export class IngestNode extends Node {
    constructor(public value?: any) {
        super();
    };
}