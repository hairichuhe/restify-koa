// "00:05:69"; //vmware1
// "00:0C:29"; //vmware2
// "00:50:56"; //vmware3
// "00:1c:14"; //vmware4
// "00:1C:42"; //parallels1
// "00:03:FF"; //microsoft virtual pc
// "00:0F:4B"; //virtual iron 4
// "00:16:3E"; //red hat xen , oracle vm , xen source, novell xen
// "08:00:27"; //virtualbox

var os = require('os');  
var IPv4;
var vmarr=["00:05:69","00:00:00","00:0C:29","00:50:56","00:1c:14","00:1C:42","00:03:FF","00:0F:4B","00:16:3E","08:00:27"];
hostName=os.hostname();
var network=os.networkInterfaces();
// console.log(network);
for(var net in network){
	var macv=network[net][0].mac.substr(0,8);
	if(vmarr.indexOf(macv)==-1){
		for(var i=0;i<network[net].length;i++){
			if(network[net][i].family=="IPv4"){
				IPv4=network[net][i].address;
			};
		}
	};  
};
console.log('local IP: '+IPv4);


// require('getmac').getMac(function(err,macAddress){
//     if (err)  throw err
//     console.log(macAddress)
// })