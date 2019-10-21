var http=require('https')

const controller=require('./controller')

http.get('/q1',function(req,res){
    controller.question1(req,res)
});
module.exports=http;
