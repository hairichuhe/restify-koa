const koa=require("koa");
const app=new koa();
const router=require("koa-router")();
const fs=require("fs");
const readFile = file =>{
	return new Promise((resolve,reject)=>{
		fs.readFile(file,(err,data)=>err?reject(err):resolve(data))
	})
}

//主页输出hello world
router.get("/",function(ctx,next){
	console.log("主页get请求")
	ctx.body="hello world"
});

//主页post请求
router.post("/",function(ctx,next){
	console.log("主页post请求");
	ctx.body="主页post请求"
})

// del_user 页面响应
router.get("/del_user",function(ctx,next){
	console.log("del_user响应");
	ctx.body="del_user响应"
})

// /user_list 页面响应
router.get("/user_list",function(ctx,next){
	console.log("user_list响应");
	ctx.body="user_list响应"
})

// 对/ab*cd页面响应
router.get("/ab*cd",(ctx,next)=>{
	console.log("对/ab*cd页面响应");
	ctx.body="对/ab*cd页面响应"
})

// get.html响应
// router.get("/get.html",(ctx,next)=>{
// 	// fs.readFile("get.html",function(err,data){
// 	// 	if(err){
// 	// 		console.log(err)
// 	// 	};
// 	// 	console.log(data.toString())
// 	// 	ctx.body=data.toString();
// 	// })
// 	ctx.body=fs.createReadStream("get.html").toString();
// })

router.get("/get", async (ctx,next)=>{
	let content = await readFile("get.html");
	ctx.body=content;
})

// process_get
router.get("/process_get",function(ctx,next){
	var response={
		frist_name:ctx.query.frist_name,
		last_name:ctx.query.last_name
	}
	ctx.body=JSON.stringify(response);
})
app.use(router.routes(),router.allowedMethods())

var server=app.listen(8082,function(){
	var host=server.address().address;
	var port=server.address().port;
	console.log("监听地址：%s 监听端口:%s",host,port)
})