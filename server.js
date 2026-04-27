const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB successfully!"))
    .catch((error) => console.log("MongoDB connection error:", error.message));
} else {
  console.log("Warning: MONGO_URI not found in .env file");
}

app.use(express.json());
app.use(cookieParser()); // Allows us to read cookies easily
app.use(express.static('public'));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/items', require('./routes/items'));

app.get('/', (req, res) => {
  res.send("Lost and Found Server is running");
});

const Port = process.env.PORT || 8000;
app.listen(Port, () => {
  console.log(`Server is running on http://localhost:${Port}`);
});