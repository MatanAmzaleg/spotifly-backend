const express = require('express');
var cors = require('cors')
require('dotenv').config();
const path = require('path')

const songRoutes = require('./api/song/song.routes')

const app = express();

const port = 3001
// http://localhost:3000 -- on build
const corsOptions ={
    origin:'https://spotifly-app.onrender.com', 
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json())

app.use('/api/song', songRoutes)

app.get('/', (req, res) => {
    res.send('hello world');
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})