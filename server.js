const http = require('http')

const hostname= 'localhost'
const port = 3000

const path = require('path')
const fs = require('fs')

//Creates basic minimal server object using http.server class
//It takes a request handler that is called everytime a request is recieved. It takes 2 handlers request(req) and response(res)
const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} by method ${req.method}`);


    //If it is a GET request examine url requested. If it is just the plain localHost, it will get just a forward slash /, send back index.html
    //If it is not a GET request put the info in text/html content type and give error message
    if (req.method === 'GET') {
        let fileUrl = req.url;
        if (fileUrl === '/') {
            fileUrl = '/index.html';
        }

        const filePath = path.resolve('./public' + fileUrl); //Changing from a relative path to absolute path if a path in public is selected
        const fileExt = path.extname(filePath); //making sure it is an html path
        if (fileExt === '.html'){
            //fs.access Tells us if a file is accessible
            fs.access(filePath, err => {
                if (err) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(`<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`);
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                
                fs.createReadStream(filePath).pipe(res); //This is used to send the html file. It reads the contents of the file given in small chunks instead of all at once.
                //pipe is a method to send the data from the file path to the response stream, so the response object can access that data
            }) 
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`);
        }

    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
});