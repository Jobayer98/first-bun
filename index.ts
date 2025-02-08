const server = Bun.serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);

    // Upgrade HTTP request to WebSocket
    if (url.pathname === '/ws') {
      const success = server.upgrade(req); // Upgrade to WebSocket
      if (success) return undefined; // Let Bun handle the WebSocket connection
      else return new Response('WebSocket upgrade failed', { status: 400 });
    }

    return new Response('Hello from Bun HTTP!');
  },
  websocket: {
    open(ws) {
      console.log('WebSocket connected!');
      ws.send('Welcome to the WebSocket server!');
    },
    message(ws, message) {
      console.log('Received:', message);
      ws.send(`You said: ${message}`); // Echo the message back
    },
    close(ws) {
      console.log('WebSocket disconnected!');
    },
  },
});

console.log(`Server running at http://localhost:${server.port}`);

// const server = Bun.serve({
//   port: 3000,
//   async fetch(req) {
//     const url = new URL(req.url);
//     const method = req.method;

//     if (url.pathname === '/data' && method === 'POST') {
//       const body = await req.json(); // Parse JSON body
//       return new Response(
//         JSON.stringify({ message: 'Received!', data: body }),
//         {
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );
//     } else if (url.pathname === '/') {
//       const file = await Bun.file('./index.html'); // Read the file
//       return new Response(file); // Serve the file
//     } else {
//       return new Response('Not Found', { status: 404 });
//     }
//   },
// });

// console.log(`Server running at http://localhost:${server.port}`);
