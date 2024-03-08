// server/server.ts

// const app = require('./app.ts')
// const PORT = process.env.PORT || 6300;

// app.listen(PORT, () => {
//   console.log(`Server is running on port: ${PORT}...`);
// });

// module.exports = app;
const express = require('express')
const app = express();
require('dotenv').config();


const PORT=process.env.PORT
console.log(PORT)

app.get('/', (req: any, res: any) => {
    res.json("Hello!")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;