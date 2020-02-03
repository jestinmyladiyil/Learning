const express = require('express');
const path = require('path');
const logger = require('./Middleware/logger');

const app = express();

//init middleware
//app.use(logger);

//Body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port : ${PORT}`));

