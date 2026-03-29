const express = require('express');
const app = express()
const connectDB = require('./Config/db')
require('dotenv').config()
const cors = require('cors')
const path = require('path')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

// Connect DB 
connectDB()

// Middleware - Enhanced CORS for professional connection
const allowedOrigins = [
    process.env.FRONT_URL,
    'http://localhost:3000',
    'http://127.0.01:3000'
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())

// Health Check Endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Professional server connection active' });
})

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.use("/api/auth", require('./routes/authRoute'))
app.use("/api/product", require('./routes/productRoute'))
app.use("/api/order", require('./routes/orderRoute'))
app.use("/api/cart", require('./routes/cartRoute'))
app.use("/api/ads", require('./routes/adRoute'))
app.use("/api/review", require('./routes/reviewRoute'))
app.use("/api/discount", require('./routes/discountRoute'))
app.use("/api/feature", require('./routes/featureRoute'))
app.use("/api/coupon", require('./routes/couponRoute'))


// Error Handling
app.use(notFound);
app.use(errorHandler);

// Listen Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
