require("dotenv").config();
const axios = require("axios");
const http = require("http");

// Get URL from environment variable
const URL = process.env.RENDER_APP_URL;
const PORT = process.env.PORT || 3000;

if (!URL) {
  console.error("Error: RENDER_APP_URL environment variable is not set.");
  console.error("Set it in your .env file or as an environment variable before running.");
  process.exit(1);
}

// Create a simple HTTP server to satisfy Render's port requirement
const server = http.createServer((req, res) => {
  if (req.url === "/" || req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", message: "Keepalive pinger is running" }));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Keepalive pinger HTTP server listening on port ${PORT}`);
  console.log(`Target app: ${URL}`);
  console.log("Pinging every 1 minute...\n");
});

// Ping the target app every 1 minute
setInterval(async () => {
  try {
    const res = await axios.get(URL);
    console.log(`[${new Date().toISOString()}] Pinged: ${res.status}`);
  } catch (err) {
    console.log(`[${new Date().toISOString()}] Error pinging: ${err.message}`);
  }
}, 60 * 1000); // every 1 minute
