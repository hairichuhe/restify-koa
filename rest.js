const koa=require("koa");
const app=new koa();
const fs=require("fs");
const router=require("koa-router")();
const bodyparser=require("koa-bodyparser");

app.use(bodyparser());

router.get("/listUsers",async (ctx,next)=>{
	let users="";
	let read=function(){
		return new Promise((resolve,reject)=>{
			fs.readFile(__dirname+"/"+"users.json","utf8",function(err,data){
				users+=data;
				resolve(true)
			})
		})
	};
	await read();
	ctx.body=users;
});

router.get("/addUser",async (ctx,next)=>{
	let user={
	   "user4" : {
	      	"name" : "mohit",
	      	"password" : "password4",
	      	"profession" : "teacher",
	      	"id": 4
	   }
	};
	let add=function(){
		return new Promise((resolve,reject)=>{
			fs.readFile(__dirname+"/"+"users.json","utf8",function(err,data){
				data=JSON.parse(data);
				data["user4"]=user["user4"];
				user=data;
				resolve(true)
			})
		})
	};
	await add();
	ctx.body=user;
})

router.get("/delUser",async (ctx,next)=>{
	let res={};
	let read=function(){
		return new Promise((resolve,reject)=>{
			fs.readFile(__dirname+"/users.json","utf8",(err,data)=>{
				data=JSON.parse(data);
				delete data["user2"];
				res=data;
				resolve(true)
			})
		})
	};

	await read();
	ctx.body=res;
})

router.get("/:id",async (ctx,next)=>{
	let read=function(){
		return new Promise((resolve,reject)=>{
			fs.readFile(__dirname+"/users.json","utf8",function(err,data){
				data=JSON.parse(data);
				resolve(data["user"+ctx.params.id])
			})
		})
	}

	ctx.body=await read();
})

app.use(router.routes(),router.allowedMethods());

const server = app.listen(8082,function(){
	let host=server.address().address;
	let port=server.address().port;
	console.log("应用监听在iP为：%s,端口为：%s",host,port)
})