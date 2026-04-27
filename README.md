# Lost & Found Portal 🕵️‍♂️

A modern, full-stack community portal designed to bridge the gap between lost belongings and their rightful owners. Now enhanced with category-specific tracking and official authority integration.

## 🚀 Key Features

- **Smart Categorization**: Specialized fields for different item types:
  - **Electronics**: Track by IMEI or Serial Number.
  - **Documents**: Track by ID Type (Aadhar, PAN) and Document Number.
  - **Vehicles**: Track by Registration Plate Number.
  - **Pets**: Track by Species, Breed, and Microchip ID.
- **Police Mode**: Dedicated "Official Report" toggle for law enforcement and authority recovery centers.
- **Real-time Category Search**: Filter and search items instantly by name, ID, or description across categories.
- **Guest Reporting**: Report lost/found items without an account—just provide your email for matching alerts.
- **Automated Matching**: Instant email notifications when a lost item's unique identifier (like an IMEI or Plate) matches a found report.
- **Premium UI**: Sleek, glassmorphism-inspired dashboard with interactive animations.

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Security**: JWT Authentication, Cookie-based sessions, Bcrypt password hashing.
- **Email Service**: Nodemailer (Gmail SMTP)
- **Frontend**: HTML5, Vanilla CSS3 (Custom Design System), JavaScript (ES6+)

## 📋 Setup Instructions

### 1. Installation
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory:
```env
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
PORT=5000
```

### 3. Running the App
```bash
# Development mode
npm run dev

# Production mode
npm start
```
Access the portal at: `http://localhost:5000`

## 📜 API Highlights

- `POST /items`: Create a report (Authenticated or Guest).
- `GET /items`: Retrieve all reports with category filtering support.
- `PATCH /items/:id/claim`: Mark an item as successfully returned.
- `POST /auth/register`: Create a new user account.
- `POST /auth/login`: Secure login with HTTP-only cookie tokens.

## 📂 Project Structure

```text
├── models/
│   ├── item.js        # Enhanced schema with category fields
│   └── user.js        # User profile schema
├── public/
│   ├── index.html     # Main dynamic dashboard
│   ├── style.css      # Custom UI components & animations
│   └── script.js      # Frontend logic & category filtering
├── routes/
│   ├── items.js       # Matching & item management logic
│   └── auth.js        # Security & session endpoints
├── utils/
│   ├── mailer.js      # Notification engine
│   └── auth.js        # Authentication middleware
├── server.js          # Entry point
└── README.md          # Project documentation
```

---
Built with ❤️ to help communities stay connected.
