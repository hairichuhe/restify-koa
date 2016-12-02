const koa=require("koa");
const app=new koa();
const fs=require("fs");
const router=require("koa-router")();
const multer=require("koa-multer");
const bodyParser=require("koa-bodyparser");
const upload=multer({dest:"uploads/"});
const moment=require("moment");
const Handlebars=require("handlebars");


app.use(bodyParser());

router.get("/file.html",(ctx,next)=>{
	let res=fs.readFileSync("file.html").toString();
	ctx.body=res;
});


// 大神的代码
router.post("/api/report/export",upload.any(),async (ctx,next)=>{
	let readStream=fs.createReadStream("template/报告导出.xml");
	let data="";

	readStream.setEncoding("UTF8");
	readStream.on("data",function(chunk){
		data+=chunk
	})
	let write=function(){
		return new Promise(function (resolve, reject) {
			readStream.on("end",function(){
				console.log("读取完成");
				resolve(true);
			});
		})
	};
	let result=await write();
	
	let template = Handlebars.compile(data);
	console.log(template);
	let postdata={
		p1:ctx.req.body.img6,
		p2:ctx.req.body.img7,
		p3:ctx.req.body.img8,
		p4:ctx.req.body.img9
	}
	ctx.attachment("aaa.doc")
	ctx.body = new Buffer(template(postdata) )
})

// router.post("/file_download",async (ctx,next)=>{
// 	let writeStream=fs.createWriteStream("uploads/"+moment().unix()+"_"+ctx.req.file["originalname"]);
// 	let readStream=fs.createReadStream(ctx.req.file["path"]);
// 	let write=function(){
// 		return new Promise(function (resolve, reject) {
// 			readStream.pipe(writeStream);
// 			resolve(true);
// 		})
// 	};
// 	console.log(111);
// 	let result=await write();
// 	console.log(result);
// 	ctx.body={
// 		new:"uploads/"+moment().unix()+"_"+ctx.req.file["originalname"],
// 		path:ctx.req.file["path"]
// 	};
// })

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
let server=app.listen(80,()=>{
	let host=server.address().address;
	let port=server.address().port;
	console.log("监听主机ip：%s,监听主机端口：%s",host,port)
})