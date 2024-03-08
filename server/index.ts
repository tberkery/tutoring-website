// server/server.ts

require('dotenv').config();
const PORT = process.env.PORT


const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
import connect from './data/db';
import router from './routes/index';

// class App {

//     public app: any;

//     constructor(){
//         this.app = express()
//         //this.setupMiddlewares()
//         //this.dbConnection()
//         //this.setRouting()
//     }

//     setupMiddlewares() {
//         this.app.get('/', (req: any, res: any) => {
//             res.send('Hello World!')
//         })
//         this.app.use(cors()); 
//         this.app.use(express.json())
//         this.app.use(bodyParser.json())
//         this.app.use(bodyParser.urlencoded({ extended: false }))
//     }

//     async dbConnection(){
//         await connect()
//     }

//     setRouting() {
//         this.app.use(router)
//     }
// }



const app = express()

app.get('/', (req: any, res: any) => {res.send('Hello World!')})
app.use(cors()); 
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req: any, res: any) => {
    res.json("Hello!")
})

app.use(router);

// (async () => {
//   await connect();
// })();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;