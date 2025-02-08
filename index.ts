const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    const method = req.method;

    if (url.pathname === '/data' && method === 'POST') {
      const body = await req.json(); // Parse JSON body
      return new Response(
        JSON.stringify({ message: 'Received!', data: body }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } else if (url.pathname === '/') {
      const file = await Bun.file('./index.html'); // Read the file
      return new Response(file); // Serve the file
    } else {
      return new Response('Not Found', { status: 404 });
    }
  },
});

console.log(`Server running at http://localhost:${server.port}`);
