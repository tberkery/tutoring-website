// server/server.ts
export {}
require('dotenv').config();
const PORT = process.env.PORT
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const connect = require('./data/db');
//import connect from './data/db';
//import router from './routes/index';


const app = express()

app.get('/', (req: any, res: any) => {res.send('Hello World!')})
app.use(cors()); 
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req: any, res: any) => {
    res.json("Hello!")
})



connect();
// (async () => {
//   await connect();
// })();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;