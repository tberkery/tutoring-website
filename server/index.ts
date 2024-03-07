// server/server.ts

const app = require('./app.ts')
const PORT = process.env.PORT || 6300;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}...`);
});

module.exports = app;