const koa=require("koa");
const app=new koa();
const fs=require("fs");
const router=require("koa-router")();
const multer=require("koa-multer");
const bodyParser=require("koa-bodyparser");
const upload=multer({dest:"uploads/"});
const moment=require("moment");


app.use(bodyParser());

router.get("/file.html",(ctx,next)=>{
	let res=fs.readFileSync("file.html").toString();
	ctx.body=res;
});

router.post("/file_upload",upload.single("image"),async (ctx,next)=>{
	console.log(ctx.req.file);
	let file=ctx.req.file;
	let newName="";
	let newPath="";
	let originalName='';

	originalName=file["originalname"];
	newPath="uploads/";

	let time=moment().unix();
	newName=time+"_"+originalName;
	let timPath=file["path"];

	console.log(newPath+newName);
	let writeStream=fs.createWriteStream(newPath+newName);
	let readStream=fs.createReadStream(timPath);

	readStream.pipe(writeStream);

	// let images= await Images.create({
	// 	name:originalName,
	// 	path:newPath+newName
	// });
	ctx.body={
		name:originalName,
		path:newPath+newName
	};
})











app.use(router.routes(),router.allowedMethods());
let server=app.listen(8082,()=>{
	let host=server.address().address;
	let port=server.address().port;
	console.log("监听主机ip：%s,监听主机端口：%s",host,port)
})