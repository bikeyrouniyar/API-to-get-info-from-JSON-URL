const http = require('https');
var url = require('url')

let req = http.get("https://raw.githubusercontent.com/arvpan/assignment/master/favs.json", function(res) {
	let data = '',
		json;

	res.on('data', function(stream) {
		data += stream;
    });
    var arr=[];
    var user=[]
	res.on('end', function() {
		json = JSON.parse(data);
        for(var i=0;i<json.length;i++){
           arr.push({"ID":json[i].id,"CreatedAt": json[i].created_at ,"Text": json[i].text});
           

        }

        for(var i=0;i<json.length;i++){
            exports.question4=(JSON.stringify(json[i]))
        }

        for(var i=0;i<json.length;i++){
            user.push({"ID":json[i].id,"User" : json[i].user.name , "screenName": json[i].user.screen_name })
        }

        var k=JSON.stringify(arr);
        exports.question1=k;
         var name=JSON.stringify(user);
          exports.user_name= name;
        exports.tweets = function(req){
            var urlParts = url.parse(req.url,true);
            var id = urlParts.query.id;
            if(id) {
                json.map(element => {
                    if(element.id.toString() == id) {
                        data = element;
                    } 
            
                });
                return JSON.stringify(data);
            } else {
                return JSON.stringify({});
            }
        }
        exports.userData = function(req){
            var urlParts = url.parse(req.url,true);
            var name = urlParts.query.name;
            if(name) {
                json.map(element => {
                    if(element.user.screen_name == name) {
                        data = element.user;
                    } 
            
                });
                return JSON.stringify(data);
            } else {
                return JSON.stringify({});
            }
        }
        exports.links = function() {
            var a = [];
            json.forEach(element => {
                var arr = [];
                for (var prop in element) {
                    if(typeof(element[prop]) == "string" && element[prop].match(/\bhttp/g)) {
                        arr.push(element[prop]);
                    }
                }
                for (var i in element.user) {
                    if(typeof(element.user[i]) == "string" && element.user[i].match(/\bhttp/g)) {
                        arr.push(element.user[i]);
                    }
                }
                var b = {
                    id : element.id,
                    urls : arr
                }
                a.push(b);
            });

            return JSON.stringify(a);
        }
	});
});

req.on('error', function(e) {
    console.log(e.message);
});
