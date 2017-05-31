const Router = require("koa-router");
const { uploadFile } = require('../../utils/file/upload');
const path = require('path')
let upload = new Router();

module.exports = upload;

upload
    .post("/",async(ctx)=>{
    	let serverFilePath = path.join( __dirname, 'upload-files' )
	    // 上传文件事件
	    let result = await uploadFile( ctx, {
	      fileType: 'album', // common or album
	      path: serverFilePath
	    });
		ctx.body=result
	})
