const express = require('express');

require('dotenv').config();

const app = express();

app.use(express.static('build'));

app.listen(80, () => console.log('Now serving the ./build directory on port 80!'))