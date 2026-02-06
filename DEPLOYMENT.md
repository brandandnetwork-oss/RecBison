# How to Deploy to Hostinger (VPS or Node.js Hosting)

This guide explains how to deploy your "Giant" website to Hostinger using Node.js instead of PHP.

## Prerequisites
1.  **Hostinger Plan**: You need a plan that supports Node.js (Ubuntu VPS is best, or Shared Hosting **IF** it supports Node.js apps).
2.  **SSH Access**: You should have SSH access to your server.

# Deployment Guide for Hostinger (Node.js)

This application is built with **Node.js** and **Express**. It replaces the old PHP logic with a modern JavaScript server.

## 1. Prerequisites
- **Node.js** (v16 or higher)
- **NPM**

## 2. Local Testing
To run the app locally:
```bash
npm install
npm start
```
Go to `http://localhost:3000`.

## 3. Deploying to Hostinger

### Option A: Hostinger VPS (Recommended for Control)
1.  **Connect to VPS**:
    ```bash
    ssh root@your_vps_ip
    ```
2.  **Install Node.js & Git**:
    ```bash
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs git
    ```
3.  **Clone Repository**:
    ```bash
    git clone https://github.com/brandandnetwork-oss/RecBison.git
    cd RecBison
    ```
4.  **Install Dependencies**:
    ```bash
    npm install
    ```
5.  **Setup Environment Variables**:
    Create a `.env` file:
    ```bash
    nano .env
    ```
    Paste your config (SMTP settings, etc.):
    ```
    PORT=3000
    SMTP_HOST=smtp.gmail.com
    SMTP_PORT=587
    SMTP_USER=your_email@gmail.com
    SMTP_PASS=your_app_password
    EMAIL_TO=recipient@example.com
    ```
6.  **Run with PM2 (Process Manager)**:
    ```bash
    npm install -g pm2
    pm2 start server.js --name "recbison"
    pm2 save
    pm2 startup
    ```
7.  **Setup Nginx (Reverse Proxy)**:
    Install Nginx and configure it to proxy requests from port 80 to port 3000.

### Option B: Hostinger Cloud / Shared with Node.js Support
1.  **Upload Files**: Use File Manager or verified Git integration to upload your project files to `public_html` (or a subdirectory).
2.  **Node.js Selector**: In Hostinger Setup, find "Node.js" section.
    - Set Version to **18.x** or **16.x**.
    - Set Application Mode to **Production**.
    - Set Application Entry File to `server.js`.
3.  **Install Dependencies**: Click "NPM Install" in the Hostinger dashboard.
4.  **Environment Variables**: Hostinger Cloud might require defining variables in the dashboard or loading them differently. If `.env` is not read, check Hostinger documentation.

**IMPORTANT**: Since we removed PHP files, your server MUST handle requests via `server.js` and NOT try to serve `.php` files directly. The Node.js server handles the `/contact.php` route internally for backward compatibility.
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
