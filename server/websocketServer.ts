import WebSocket, { WebSocketServer } from 'ws';

export const webSocketServerInit = () => {

    const wss = new WebSocketServer({ port: 8081 });

    wss.on('connection', function connection(ws) {
        ws.on('message', function message(data, isBinary) {

            console.log('received: %s', data);

            wss.clients.forEach(function each(client) {




                if (client !== ws && client.readyState === WebSocket.OPEN) {

                    // const dataJson = JSON.parse(data)
                    // if (dataJson.event == 'mousemove') {
                    //     client.send(data, { binary: isBinary });
                    // } else {
                    client.send(data, { binary: isBinary });
                    // }
                    console.log('sent: %s', data);


                }
            });
        });

        // ws.send('something');
    });
}