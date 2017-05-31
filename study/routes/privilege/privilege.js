const Router=require("koa-router");
let privilege = new Router();

module.exports = privilege;

privilege
	.get("/",async(ctx)=>{
		ctx.throw(400, 'name required')
	})
	.get("/list",async(ctx)=>{
		ctx.body="这里是权限列表！"
	})