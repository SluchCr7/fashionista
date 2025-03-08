const express = require('express');
const app = express()
const connectDB = require('./Config/db')
require('dotenv').config()
const cors = require('cors')
// Connect DB 
connectDB()

// Middleware
app.use(express.json()) 
app.use(cors())

// Routes
app.get('/', (req, res) => {
    res.send('Hello Server')
})

app.use("/api/auth" , require('./routes/authRoute'))
app.use("/api/product" , require('./routes/productRoute'))
app.use("/api/order", require('./routes/orderRoute'))

// Listen Server
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))