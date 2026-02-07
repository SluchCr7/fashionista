const express = require('express');
const app = express()
const connectDB = require('./Config/db')
require('dotenv').config()
const cors = require('cors')
const path = require('path')
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
app.use("/api/ads", require('./routes/adRoute'))
app.use("/api/review", require('./routes/reviewRoute'))
app.use("/api/discount", require('./routes/discountRoute'))
app.use("/api/feature", require('./routes/featureRoute'))

// Listen Server
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))