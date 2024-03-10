// server/index.ts
require('dotenv').config();
const PORT = process.env.PORT
const app = require('./app');

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;