const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3000

// Enable CORS for all routes
app.use(cors())

// Utility to generate one random hex color
const generateHexColor = () => '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')

app.get('/colors', (req, res) => {
   const count = parseInt(req.query.count, 10) || 10

   if (count > 10000) {
      return res.status(400).json({ error: 'Count too large. Max 10,000.'})
   }

   const colors = Array.from({ length: count }, generateHexColor)
   res.json({ count, colors })
})

app.get('/', (req, res) => {
   res.send('Use /colors?count=N to get N random hex colors')
})

app.listen(PORT, () => {
   console.log(`Color API running on port ${PORT}`)
})