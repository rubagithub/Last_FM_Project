require('dotenv').config();
const express = require ('express');
const app = express();
const port = process.env.PORT;

const artistsRouter = require('./src/modules/artist/router');

app.use('/artists', artistsRouter);

app.listen(port, () => {
    console.log(`Server is listening to port ${port}`);
})
