var koa=require("koa");
var app=koa();

app.get("/",function(req,res){
	res.send("hello world");
});

var server = app.listen(8081,function(){
	var host=server.address().address;
	var port=server.address().port;
	console.log("应用实例访问地址为%s:%s");
})