const { urlencoded } = require('express');
const express = require('express');
const app = express();

const path = require('path');
const logger = require('./middleware/logger');

//////////// initialize middleware
// data logger middleware
app.use(logger);

// body parser middleware
app.use(express.json()); 
// handle urlencoded data
app.use(urlencoded({extended: false})); 

// include middleware
// express.static will generate static files for static webpage 
app.use(express.static(path.join(__dirname, 'public'))); 

// Member API routes
app.use('/api/members', require('./routes/api/members'))





const PORT = process.env.PORT || 5000;

// listening requests
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

