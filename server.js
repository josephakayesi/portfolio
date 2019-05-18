const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// Cors middleware
app.use(cors())

// Route
const bio = require('./routes/api/bio')

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// DB config
const db = require('./config/keys').mongoURI

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello World.')
})

// Use route
app.use('/api/bio', bio)

const port = process.env.PORT || 5000

switch (true) {
    // Server static assets if in production
    case process.env.NODE_ENV === 'production':
        // Set static folder
        app.use(express.static('client/build'))

        app.get('/*', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
        })
        break
    case process.env.NODE_ENV !== 'test':
        app.listen(port, () => {
            console.log(`Server running on port ${port}`)
        })
        break
    default:
        break
}

module.exports = { app }