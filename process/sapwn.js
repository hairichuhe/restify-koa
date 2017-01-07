const fs=require("fs");
const child_process=require("child_process");

for(let i=0;i<3;i++){
	let workPorcess=child_process.spawn("node",["support.js",i]);
	workPorcess.stdout.on("data",(data)=>{
		console.log("stdout： "+data)
	})
	workPorcess.stderr.on("data",(data)=>{
		console.log("stderr： "+data)
	})
	workPorcess.on("close",(code)=>{
		console.log("子进程退出，退出码："+code)
	})
}