var http = require('http')
var url = require('url')

const hostname = '127.0.0.1';
const port = 3000;

//const q1=require('./route');
const controller = require('./controller')
var fs = require('fs')


var server = http.createServer((function (request, response) {
    var urlParts = url.parse(request.url);
    console.log("===>",urlParts.pathname)
    switch (urlParts.pathname) {
        case '/question1':
            question1(request, response)
            break;
        case '/question2':
            question2(request, response)
            break;
        case '/question3':
            question3(request, response)
            break;
        case '/tweets' :
            question4(request,response);
            break;
        case '/users' :
            userData(request,response);
            break;
        case '/links' :
            links(request,response);
            break;
        default:
                home(request, response);
            break;
    }
   
}));
server.listen(port,hostname, () => {
    console.log("listening at : http://127.0.0.1:3000");
});

function question1(request, response) {
    response.end(controller.question1)
}

function question2(request, response) {
    response.end(controller.user_name)
}

function home(request, response) {
    response.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile('./index.html', null, function (err, data) {
        if (err) {
            response.writeHead(404)
            response.write('not found')
        } else {
            response.write(data);
        }
        response.end();
    })
    

}



function question4(request, response) {
    response.end(controller.tweets(request))
}

function userData(request, response) {
    response.end(controller.userData(request))
}
function links(request, response) {
    response.end(controller.links())
}