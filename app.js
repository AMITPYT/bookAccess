require('./connection');
const express = require('express');
var cors = require('cors')
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/booksRoutes');


const app = express()
const port = 5000

app.use(cors())
app.use(express.json())
app.use(userRoutes);
app.use(bookRoutes);



app.listen(port, () => {
  console.log(` listening at http://localhost:${port}`)
})