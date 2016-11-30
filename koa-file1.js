const koa=require("koa");
const app=new koa();
const fs=require("fs");
const router=require("koa-router")();
const multer=require("koa-multer");
const bodyParser=require("koa-bodyparser");
const upload=multer({dest:"uploads/"});


app.use(bodyParser());

router.get("/file.html",(ctx,next)=>{
	let res=fs.readFileSync("file.html").toString();
	ctx.body=res;
});

router.post("/file_upload", upload.single("image"), (ctx,next)=>{
	console.log(ctx.req);  // 上传的文件信息

  var des_file = __dirname + "/" + ctx.req.file.originalname;
  fs.readFile( ctx.req.file.path, function (err, data) {
    fs.writeFile(des_file, data, function (err) {
      if( err ){
        console.log( err );
      }else{
        response = {
          message:'File uploaded successfully', 
          filename:ctx.req.file.originalname
        };
      }
      console.log( response );
      ctx.body=response;
    });
  });
})











app.use(router.routes(),router.allowedMethods());
let server=app.listen(8082,()=>{
	let host=server.address().address;
	let port=server.address().port;
	console.log("监听主机ip：%s,监听主机端口：%s",host,port)
})