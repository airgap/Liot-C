import {Network, Listener, IngestNode, AddNode} from '../index';

const   helloNode = new IngestNode('Hello'),
        worldNode = new IngestNode(),
        addNode     = new AddNode(helloNode, ' ', worldNode),
        net = new Network(helloNode, worldNode, addNode),
        iterations = 2500000,
        did = () => ++count == iterations ? console.timeEnd('timing') : 0;
let count = 0;

net.addListener(new Listener(addNode, did));
console.time('timing');
for(let i = 0; i < iterations; i ++)
    net.send(worldNode,'world!');