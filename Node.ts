import {Network} from "./Network";

export class Node {
    uuid = () => {
        let str = '', alph = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', c = 0;
        // Needs simplifying. Golfing this code was not an ideal approach
        for(;c<25;) str += alph[~~(Math.random()*25)]+((4-c++)%5||c>23?'':'-');
        return str;
    };
    id = this.uuid();
    accessor = this.uuid();
    toString = () => this.id;
    network: Network | null = null;
    send: (value: any) => boolean = (value: any) => {
        return this.network ? this.network.send(this, value) : false;
    };
}