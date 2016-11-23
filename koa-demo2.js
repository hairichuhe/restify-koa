const koa=require("koa");
const app=new koa();
const router=require("koa-router");

//主页输出hello world
router.get("/",function(ctx,next){
	console.log("主页get请求")
	ctx.body="hello world"
});

app.use(router.routes(),router.allowMethods())

var server=app.listen(8082,function(){
	var host=server.address().address;
	var port
})