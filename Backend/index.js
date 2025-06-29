const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const connectDb = require('./config/db');

const founderRoutes = require('./route/founderRoutes');

// Load .env variables
dotenv.config();

// Connect to MongoDB
connectDb();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(morgan("dev"));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Routes can go here...
app.use('/', require('./route/userRoutes'));
//Routes of Founder
app.use('/founder',founderRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
