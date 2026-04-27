# 🔍 Lost & Found Portal

[![Node.js Version](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v5.0-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/cloud/atlas)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)
[![Deployment: Render](https://img.shields.io/badge/Deployment-Render-46E3B7.svg)](https://render.com/)

A premium, full-stack community application designed to reconnect people with their lost belongings. This platform features a modern glassmorphism UI, automated matching logic, and secure authentication.

---

## ✨ Key Features

- **🛡️ Authority Integration**: Dedicated "Police Mode" for official recovery reports.
- **📱 Smart Categorization**:
  - **Electronics**: Search by IMEI or Serial Number.
  - **Vehicles**: Track by Plate Number.
  - **Documents**: Search by ID Number (Aadhar, PAN, etc.).
  - **Pets**: Specialized fields for Breed and Microchip IDs.
- **📧 Automated matching**: Instant email alerts when a unique identifier (like IMEI) matches between a Lost and Found report.
- **🎨 Premium UI**: Interactive dashboard built with modern CSS techniques and smooth animations.
- **🔐 Secure Auth**: JWT-based authentication with HTTP-only cookies for enhanced security.

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Vanilla JS (ES6+), Modern CSS3 (Glassmorphism), HTML5 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (Mongoose ODM) |
| **Email** | Nodemailer (SMTP) |
| **Auth** | JWT, Bcrypt.js, Cookie-Parser |

---

## 🚀 Deployment on Render

This project is optimized for deployment as a **Web Service** on [Render](https://render.com/).

### Steps to Deploy:

1. **Push to GitHub**: Ensure your latest changes are pushed to your repository.
2. **Create Web Service**:
   - Log in to Render and click **New > Web Service**.
   - Connect your GitHub repository.
3. **Configure Environment Variables**:
   Add the following in the **Environment** tab:
   - `MONGO_URI`: Your MongoDB connection string.
   - `EMAIL_USER`: Your Gmail address.
   - `EMAIL_PASS`: Your Gmail App Password.
   - `PORT`: `10000` (Render handles this automatically, but you can specify if needed).
4. **Build & Start Settings**:
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. **Deploy**: Click **Create Web Service**. Render will build and host your app at a `*.onrender.com` URL.

---

## 📋 Local Setup

1. **Clone & Install**:
   ```bash
   git clone https://github.com/satyarthprakash004/lost-and-found.git
   cd lost-and-found
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file:
   ```env
   MONGO_URI=your_mongodb_uri
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   PORT=5000
   ```

3. **Run**:
   ```bash
   npm run dev  # Development (with nodemon)
   npm start    # Production
   ```

---

## 📂 Project Structure

```text
├── models/         # Mongoose schemas (Item, User)
├── public/         # Frontend assets (HTML, CSS, JS)
├── routes/         # API endpoints (Auth, Items)
├── utils/          # Helpers (Mailer, Auth middleware)
├── server.js       # Main application entry point
└── .env            # Configuration (Secrets)
```

---

Built with ❤️ by [Satyarth Prakash](https://github.com/satyarthprakash004)

