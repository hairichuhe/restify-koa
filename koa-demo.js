const koa=require("koa");
const app=new koa();
const router=require("koa-router")();

//主页输出hello world
router.get("/",function(ctx,next){
	ctx.body="hello world";
});

app.use(router.routes(),router.allowedMethods())
var server = app.listen(8081,function(){
	var host=server.address().address;
	var port=server.address().port;
	console.log("应用实例访问地址为%s:%s",host,port);
})