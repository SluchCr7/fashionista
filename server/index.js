const express = require('express');
const app = express()
const connectDB = require('./Config/db')
require('dotenv').config()
const cors = require('cors')
// Connect DB 
connectDB()

// Middleware
app.use(express.json()) 
app.use(cors({  
    origin: process.env.FRONT_URL,
}))

// Routes
app.get('/', (req, res) => {
    res.send('Hello Server')
})

app.use("/api/auth" , require('./routes/authRoute'))
app.use("/api/product" , require('./routes/productRoute'))
app.use("/api/order", require('./routes/orderRoute'))
app.use("/api/ads", require('./routes/adRoute'))
app.use("/api/review", require('./routes/reviewRoute'))
app.use("/api/discount", require('./routes/discountRoute'))

// Listen Server
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))