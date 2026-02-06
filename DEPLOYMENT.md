# How to Deploy to Hostinger (VPS or Node.js Hosting)

This guide explains how to deploy your "Giant" website to Hostinger using Node.js instead of PHP.

## Prerequisites
1.  **Hostinger Plan**: You need a plan that supports Node.js (Ubuntu VPS is best, or Shared Hosting **IF** it supports Node.js apps).
2.  **SSH Access**: You should have SSH access to your server.

## Steps

### 1. Upload Files
Upload all the files in the `Giant-v1-0-Template` folder to your server (e.g., via FileZilla or FTP) to the `public_html` folder or a subfolder (e.g., `/home/u123456789/domains/yourdomain.com/public_html`).

### 2. Configure Environment Variables
1.  Rename `.env.example` to `.env`.
2.  Open `.env` and fill in your details:
    *   **SMTP Credentials**: Use your Hostinger Email (Titan) or Gmail.
    *   **MailChimp**: Add your API Key if you use the newsletter.

### 3. Install Dependencies
Connect to your server via SSH and navigate to the folder where you uploaded the files:

```bash
cd /path/to/your/folder
npm install
```

### 4. Test the Server
Run the server to see if it works:

```bash
npm start
```

You should see: `Server is running on port 3000`.

### 5. Keep the Server Running (Production)
You don't want the server to stop when you close the SSH window. Use `pm2` for this.

1.  Install PM2 globally (if not installed):
    ```bash
    npm install -g pm2
    ```
2.  Start the app:
    ```bash
    pm2 start server.js --name "giant-website"
    ```
3.  Save the list so it auto-starts on reboot:
    ```bash
    pm2 save
    pm2 startup
    ```

### 6. Point Your Domain (Reverse Proxy)
If you are running on port 3000, you need to tell the web server (Nginx/Apache) to send traffic from `yourdomain.com` to `localhost:3000`.

#### If using Hostinger Shared Node.js:
Follow their specific `.htaccess` guide or Node.js Setup UI in hPanel.

#### If using a VPS (Nginx):
Edit your Nginx config:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Then restart Nginx: `sudo systemctl restart nginx`.
