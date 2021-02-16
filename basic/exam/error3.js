const fs = require('fs').promises;

setInterval(() => {
  fs.unlink('./abcdef.js')
}, 1000);