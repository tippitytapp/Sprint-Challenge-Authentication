const server = require('./api/server.js');
const colors = require('colors');
require('dotenv').config()
const environment = process.env.NODE_ENV;

const PORT = process.env.PORT;


server.listen(PORT, () => {
  console.log(`\n=== Server listening in ${environment} mode on http://localhost:${PORT} ===\n`.magenta.bold.underline);
});
