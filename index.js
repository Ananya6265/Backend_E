const express = require('express');
const cors = require('cors');
require('dotenv').config();
const router = require('./Routes/router');
require('./dbConnection');

const etServer = express();

etServer.use(cors());
etServer.use(express.json());

etServer.use(router);

const PORT = process.env.PORT || 3000;

etServer.listen(PORT, () => {
    console.log(`Server Started on PORT = ${PORT}`);
});
