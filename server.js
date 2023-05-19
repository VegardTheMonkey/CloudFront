const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 4444;

const server = http.createServer((req, res) => {
  const filePath = req.url === '/' ? './index.html' : `.${req.url}`;
  const extname = path.extname(filePath);
  let contentType = 'text/html';

  // Set the content type based on the file extension
  switch (extname) {
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading file');
    }

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
