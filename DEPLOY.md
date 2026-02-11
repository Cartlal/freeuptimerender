# Deployment Guide

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variable
Create a `.env` file in the root directory:
```
RENDER_APP_URL=https://your-render-app.onrender.com
```

Or copy from the example:
```bash
cp .env.example .env
```

Then edit `.env` and replace with your actual Render app URL.

### 3. Test Locally
```bash
npm start
```

---

## Deploy to Render

1. Push code to GitHub
2. Create new Web Service on [render.com](https://render.com)
3. Connect your GitHub repo
4. Set deployment settings:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variable:
   - **Key**: `RENDER_APP_URL`
   - **Value**: `https://your-render-app.onrender.com`
6. Deploy

---

## Deploy to Railway.app

1. Push code to GitHub
2. Connect at [railway.app](https://railway.app)
3. Add Environment Variable:
   - **Key**: `RENDER_APP_URL`
   - **Value**: `https://your-render-app.onrender.com`
4. Deploy

---

## Deploy to Fly.io

1. Install Fly CLI
2. Run `flyctl launch`
3. Add environment variable:
```bash
flyctl secrets set RENDER_APP_URL=https://your-render-app.onrender.com
```
4. Deploy with `flyctl deploy`

---

## Deploy to VPS (Ubuntu/Linux)

1. SSH into your VPS
2. Install Node.js:
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs
```

3. Clone repository:
```bash
git clone <your-repo>
cd keepalive-pinger
```

4. Create `.env` file:
```bash
echo "RENDER_APP_URL=https://your-render-app.onrender.com" > .env
```

5. Install dependencies:
```bash
npm install
```

6. Use PM2 to run 24/7:
```bash
sudo npm install -g pm2
pm2 start keepalive.js --name "keepalive"
pm2 startup
pm2 save
```

Your pinger will now restart automatically on reboot!

---

## Verify It's Working

Check the logs to confirm pings are being sent:

**Render/Railway**: View logs in dashboard
**VPS**: `pm2 logs keepalive`
