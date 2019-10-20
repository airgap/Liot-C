import {Network} from "./Network";
import {IngestNode} from "./IngestNode";

export class Node {
    uuid = () => {
        let str = '', alph = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', c = 0;
        for(;c<25;) str += alph[~~(Math.random()*25)]+((4-c++)%5||c>23?'':'-');
        return str;
    };
    id = this.uuid();
    accessor = this.uuid();
    toString = () => this.id;
    network: Network | null = null;
    send: (value: any) => boolean = (value: any) => {
        return this.network ? this.network.send(this, value) : !1;
    };
}