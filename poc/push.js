let Mam = require('mam.client/lib/mam.node.js');
let IOTA = require('iota.lib.js');
var readline = require('readline');

rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var message = "";

var iota = new IOTA({ provider: `http://iotanode.party:14265` });

let seed = 'ZMYUUZSLALHDLXXQGAKZSZNIDWXJEHYDIWBVRZFCOYDTXSDXMFQBODQGWLU9YEDHOIKOREDYHPXHMBAPI'

mamState = Mam.init(iota, seed, 2, 0);

console.log("Enter a message!");

rl.on("line", function(input) { 
    message = input;
    publish(message);
    console.log("Enter a message!");
})

async function publish(packet){
    // Create the message.
    let trytes = iota.utils.toTrytes(JSON.stringify(packet))
    let message = Mam.create(mamState, trytes);
    // Set the mam state so we can keep adding messages.
    mamState = message.state;
    console.log('Sending message: ', packet);
    console.log('Root: ', message.root);
    console.log('Address: ', message.address);
    console.log();
    // Attach the message.
    return await Mam.attach(message.payload, message.address);
}


