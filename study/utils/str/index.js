var str = module.exports = {};
str.substr=function (target,ss,se){
	var start=target.indexOf(ss);
	var end=target.indexOf(se);
	if(start!=-1&&end!=-1){
		return target.substring(start+ss.length,end)
	}else{
		return false
	}
}