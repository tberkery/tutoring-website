// server/server.ts

require('dotenv').config();

const app = require('./app.ts')
const PORT = process.env.PORT

app.get('/', (req: any, res: any) => {
    res.json("Hello!")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;