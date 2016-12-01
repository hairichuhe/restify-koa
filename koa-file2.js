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


// 大神的代码
router.post("/file_upload",upload.single("image"),async (ctx,next)=>{
	let writeStream=fs.createWriteStream("uploads/"+moment().unix()+"_"+ctx.req.file["originalname"]);
	let readStream=fs.createReadStream(ctx.req.file["path"]);
	let write=function(){
		return new Promise(function (resolve, reject) {
			readStream.pipe(writeStream);
			resolve(true);
		})
	};
	console.log(111);
	let result=await write();
	console.log(result);
	ctx.body={
		new:"uploads/"+moment().unix()+"_"+ctx.req.file["originalname"],
		path:ctx.req.file["path"]
	};
})

// router.post("/file_upload",upload.single("image"),async (ctx,next)=>{
// 	let writeStream=fs.createWriteStream("uploads/"+moment().unix()+"_"+ctx.req.file["originalname"]);
// 	let readStream=fs.createReadStream(ctx.req.file["path"]);
// 	let write=function(){
// 		return new Promise(function (resolve, reject) {
// 			readStream.pipe(writeStream);
// 			resolve();
// 		}).then(function() {
// 			console.log(222)
// 		  	ctx.body={
// 				new:"uploads/"+moment().unix()+"_"+ctx.req.file["originalname"],
// 				path:ctx.req.file["path"]
// 			};
// 		});
// 	}
// 	console.log(111)
// 	await write()
// })

// router.post("/file_upload",upload.single("image"),async (ctx,next)=>{
// 	let writeStream=function(){
// 		return new Promise(function (resolve, reject) {
// 			fs.createWriteStream("uploads/"+moment().unix()+"_"+ctx.req.file["originalname"]);
// 		})
// 	};
// 	let readStream=fs.createReadStream(ctx.req.file["path"]);

// 	readStream.pipe(writeStream);
// 	await writeStream.then(function() {
// 	  	ctx.body={
// 			new:"uploads/"+moment().unix()+"_"+ctx.req.file["originalname"],
// 			path:ctx.req.file["path"]
// 		};
// 	});
// })
// router.post("/file_upload",upload.single("image"),async (ctx,next)=>{
// 	let writeStream=fs.createWriteStream("uploads/"+moment().unix()+"_"+ctx.req.file["originalname"]);
// 	let readStream=fs.createReadStream(ctx.req.file["path"]);
// 	await writeStream.on('finish', function() {
// 	    console.log("写入完成。");
// 	    ctx.body={
// 			new:"uploads/"+moment().unix()+"_"+ctx.req.file["originalname"],
// 			path:ctx.req.file["path"]
// 		};
// 	});

// 	readStream.pipe(writeStream);
	
// 	// console.log(111);
// })
app.use(router.routes(),router.allowedMethods());
let server=app.listen(8082,()=>{
	let host=server.address().address;
	let port=server.address().port;
	console.log("监听主机ip：%s,监听主机端口：%s",host,port)
})