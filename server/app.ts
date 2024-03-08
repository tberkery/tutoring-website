// //server/app.js
// require("dotenv").config({ path: "./config.env" });

// const express = require('express')
// const bodyParser = require('body-parser')
// const cors = require('cors');
// import connect from './data/db';
// import router from './routes/index';

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

// module.exports = new App().app



