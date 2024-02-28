//server/app.js
export {}

require("dotenv").config({ path: "./config.env" });

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors');
const { connect } = require('./database');
const router = require('./controller');

class App {

    public app: any;

    constructor(){
        this.app = express()
        this.setupMiddlewares()
        this.dbConnection()
        this.setRouting()
    }

    setupMiddlewares() {
        this.app.use(cors()); 
        this.app.use(express.json())
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
    }

    async dbConnection(){
        await connect()
    }

    setRouting() {
        this.app.use(router)
    }
}

module.exports = new App().app



