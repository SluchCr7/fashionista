const express = require('express');
const app = express();
const connectDB = require('./Config/db');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xssClean = require('xss-clean');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

const PORT = process.env.PORT || 5000;

// Request logging (simple console logging)
const requestLogger = (req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
    });
    next();
};

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "blob:", "res.cloudinary.com"]
        }
    }
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: { success: false, message: "Too many requests, please try again later." }
});
app.use('/api/', limiter);

// Middleware - Enhanced CORS for professional connection
const allowedOrigins = [
    process.env.FRONT_URL,
    'http://localhost:3000',
    'http://localhost:3001',
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1 && process.env.NODE_ENV !== 'development') {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(requestLogger);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Professional server connection active',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// API Info endpoint
app.get('/api/info', (req, res) => {
    res.json({
        success: true,
        message: 'E-commerce API',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            products: '/api/product',
            orders: '/api/order',
            cart: '/api/cart',
            ads: '/api/ads',
            reviews: '/api/review',
            discounts: '/api/discount',
            features: '/api/feature',
            coupons: '/api/coupon'
        }
    });
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use("/api/auth", require('./routes/authRoute'));
app.use("/api/product", require('./routes/productRoute'));
app.use("/api/order", require('./routes/orderRoute'));
app.use("/api/cart", require('./routes/cartRoute'));
app.use("/api/ads", require('./routes/adRoute'));
app.use("/api/review", require('./routes/reviewRoute'));
app.use("/api/discount", require('./routes/discountRoute'));
app.use("/api/feature", require('./routes/featureRoute'));
app.use("/api/coupon", require('./routes/couponRoute'));

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

// Start server after connecting to Database
const startServer = async () => {
    try {
        await connectDB();
        console.log("Database connected successfully.");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
    try {
        const server = app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

        // Handle unhandled promise rejections
        process.on('unhandledRejection', (err) => {
            console.error('Unhandled Rejection:', err.message);
            if (server && typeof server.close === 'function') {
                server.close(() => process.exit(1));
            } else {
                process.exit(1);
            }
        });

    } catch (error) {
        console.error("Failed to start express server:", error);
        process.exit(1);
    }
};

startServer();
