const http = require("http");
const fs = require('fs');

const renderHtml = (path, res) => {
    fs.readFile(path, (e, data) => {
        if (e) {
            res.writeHead(404);
            res.write("error file not Found");
        } else {
            res.write(data);
        }
        res.end();
    });
}

const port = 3000;
http
    .createServer((req, res) => {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        const url = req.url;
        console.log(url);
        if (url === "/about") {
            renderHtml('./about.html', res);
        } else if (url === "/contact") {
            renderHtml('./contact.html', res);
        } else {
            renderHtml('./index.html', res);
        }

    })
    .listen(port, () => {
        console.log(`Server is listening in port url http://localhost:${port}`);
    });
