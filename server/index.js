const express = require('express');
const app = express()
const connectDB = require('./Config/db')
require('dotenv').config()
const cors = require('cors')
const path = require('path')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

// Connect DB 
connectDB()

// Middleware
app.use(express.json())
app.use(cors({
    origin: process.env.FRONT_URL,
}))

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
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))
