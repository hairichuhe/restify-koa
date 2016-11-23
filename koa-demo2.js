const koa=require("koa");
const app=new koa();
const router=require("koa-router");

//主页输出hello world
router.get("/",function(ctx,next){
	ctx.body="hello world"
})