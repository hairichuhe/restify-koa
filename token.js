const koa=require("koa");
const app=new koa();
const fs=require("fs");
const router=require("koa-router")();
const bodyparser=require("koa-bodyparser");

app.use(bodyparser());


router.options("*",(ctx,next)=>{
	console.log(2)
	ctx.set('Access-Control-Allow-Origin','*');
	ctx.set('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
	ctx.set('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS');
	ctx.body=true;
})

router.post("/oauth/token",(ctx,next)=>{
	console.log(ctx);
	ctx.set('Access-Control-Allow-Origin','*');
	ctx.body="aa";
})

app.use(router.routes(),router.allowedMethods());

const server = app.listen(80,function(){
	let host=server.address().address;
	let port=server.address().port;
	console.log("应用监听在iP为：%s,端口为：%s",host,port)
})