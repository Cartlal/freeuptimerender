require("dotenv").config();
const axios = require("axios");

// Get URL from environment variable
const URL = process.env.RENDER_APP_URL;

if (!URL) {
  console.error("Error: RENDER_APP_URL environment variable is not set.");
  console.error("Set it in your .env file or as an environment variable before running.");
  process.exit(1);
}

console.log(`Keepalive pinger started. Target: ${URL}`);
console.log("Pinging every 1 minute...\n");

setInterval(async () => {
  try {
    const res = await axios.get(URL);
    console.log(`[${new Date().toISOString()}] Pinged: ${res.status}`);
  } catch (err) {
    console.log(`[${new Date().toISOString()}] Error pinging: ${err.message}`);
  }
}, 60 * 1000); // every 1 minute
