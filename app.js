const Gdax = require('gdax');
const websocket = new Gdax.WebsocketClient(['BTC-USD', 'ETH-USD']);
const EventHubClient = require('azure-event-hubs').Client;
const client = EventHubClient.fromConnectionString(process.env.EVENTHUB);

let sender;

client.open().then(function() {
        return client.createSender();
    }).then(function(tx) {
        sender = tx;
})

websocket.on('message', data => {
    sender.send({ contents: JSON.stringify(data)});
    console.log("sent");
    /* 
    { 
        type: 'open',
        side: 'sell',
        price: '305.61000000',
        order_id: '0dcbbe69-2f44-4f5d-82c9-ae04712df619',
        remaining_size: '117.21000000',
        product_id: 'ETH-USD',
        sequence: 1387068691,
        time: '2017-10-30T21:39:46.316000Z' 
    } 
    */

});