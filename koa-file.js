const koa=require("koa");
const app=new koa();
const fs=require("fs");
const router=require("koa-router");
const multer=require("koa-multer");
const bodyParser=require("koa-bodyparser");
const upload=multer({dest:"uploads/"});


app.use(bodyParser());

router.get("/file.html",(ctx,next)=>{
	let res=fs.readFileAsync("/file.html").toString();
	ctx.body=res;
});

router.post("/file_upload",(ctx,next)=>{

})











app.use(router.routes(),router.allowMethods())