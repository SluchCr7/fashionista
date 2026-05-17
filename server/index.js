const express = require('express');
const app = express()
const connectDB = require('./Config/db')
require('dotenv').config()
const cors = require('cors')
const path = require('path')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

// Security middleware
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xssClean = require('xss-clean');

// Request logging (simple console logging)
const requestLogger = (req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
    });
    next();
};

const startServer = async () => {
    try {
        await connectDB(); // ⬅️ استنى الاتصال

        const server = app.listen(PORT, () => 
            console.log(`Server running on port ${PORT}`)
        );

        // Handle unhandled promise rejections
        process.on('unhandledRejection', (err) => {
            console.error('Unhandled Rejection:', err.message);
            server.close(() => process.exit(1));
        });

    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();

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

// Middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(xssClean());
app.use(cors({
    origin: process.env.FRONT_URL,
    credentials: true
}))
app.use(requestLogger);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        success: true, 
        message: 'Server is running',
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
const PORT = process.env.PORT || 5000;

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err.message);
    // Close server & exit process
    server.close(() => process.exit(1));
});

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
