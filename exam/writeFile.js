const fs = require('fs').promises;

fs.writeFile('./writeme.txt','글이 입력됩니까?!123123')
  .then(()=>{
    return fs.readFile('./writeme.txt');
  })
  .then((data) => {
    console.log(data.toString());
  })
  .catch((err) => {
    throw err;
  });
  