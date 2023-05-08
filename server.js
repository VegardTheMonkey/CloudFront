const http = require('http');
const fs = require('fs');

const port = 3333;

const server = http.createServer((req, res) => {
  // read the HTML file and send it as the response
  fs.readFile('./index.html', (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
});
  
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  