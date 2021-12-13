const http = require('http')

const hostname= 'localhost'
const port = 3000

//Creates basic minimal server object using http.server class
//It takes a request handler that is called everytime a request is recieved. It takes 2 handlers request(req) and response(res)
const server = http.createServer((req, res) => {
    console.log(req.headers) //headers is a default property on req that we have access to 
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html') //Tells the client what type of data to expect in the response body
    res.end('<html><body><h1>HelloWorld!</h1></body></html>'); //This will be the response sent back to the client
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})