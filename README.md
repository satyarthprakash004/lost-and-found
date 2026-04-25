# Lost & Found Portal 🕵️‍♂️

A modern, full-stack web application designed to help communities connect lost items with their rightful owners.

## 🚀 Features

- **Premium Frontend**: A sleek, dark-themed dashboard with glassmorphism effects.
- **Smart Matching Logic**: Automatically detects matches between lost and found reports.
- **Email Notifications**: Instant email alerts sent to owners when a match is found.
- **Responsive Dashboard**: Real-time list of all reported items with status tracking.
- **Filterable Items**: Quickly sort through 'Lost' and 'Found' categories.

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Email Service**: Nodemailer (Gmail SMTP)
- **Frontend**: HTML5, Vanilla CSS3, JavaScript (ES6+)

## 📋 Setup Instructions

### 1. Prerequisites
- Node.js installed on your machine.
- A MongoDB database (local or Atlas).

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory and add the following:
```env
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-character-app-password
PORT=3000
```

### 4. Gmail App Password Setup (CRITICAL)
Regular Gmail passwords will not work. You must:
1. Enable **2-Step Verification** on your Google Account.
2. Go to [App Passwords](https://myaccount.google.com/apppasswords).
3. Create an app named "LostAndFound".
4. Copy the **16-character code** (no spaces) into `EMAIL_PASS` in your `.env`.

## 🏃‍♂️ Running the App

Start the development server:
```bash
npm run dev
```
Open your browser to: `http://localhost:3000`

## 📂 Project Structure

```text
├── models/
│   └── item.js        # Mongoose schema for items
├── public/
│   ├── index.html     # Main frontend structure
│   ├── style.css      # Premium styling
│   └── script.js      # Frontend logic & API calls
├── routes/
│   └── items.js       # API endpoints for item management
├── utils/
│   └── mailer.js      # Email notification logic
├── .env               # Private configuration
├── server.js          # Main entry point
└── package.json       # Project dependencies
```

## 📜 API Endpoints

- `GET /items`: Fetch all lost and found items.
- `POST /items`: Report a new item (triggers matching logic).
- `PATCH /items/:id/claim`: Mark an item as claimed.

---
Built with ❤️ for a better community.
