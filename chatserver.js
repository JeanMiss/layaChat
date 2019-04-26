var WebSocketServer = require('ws');
var wss = new WebSocketServer.Server({port:8036});
var clients=new Object();
var msglist=[];
wss.on('connection',function(ws,req){
    var clientIp = req.connection.remoteAddress;
    var obj = clients[clientIp];
    var isReyConnected = false;
    if(obj==null){
        clients[clientIp]={"id":clientIp,"ws":ws};
        obj = clients[clientIp];
    }else{
        console.log('client had connected ip ',clientIp);
        isReyConnected = true;
    }
    
    console.log('client connected ip ',clientIp);

     ws.on('message',function(message){
        var msg = JSON.parse(message);
        if(msg.hasOwnProperty("op")){
            if(msg.op=="checkname"){
                ws.send(JSON.stringify({"nameOk":hasName(msg.name)}));
            }else if(msg.op=="login"){
                if(isReyConnected){
                    ws.send(JSON.stringify({"loginError":"同一个IP不能重复登录"}));
                    return;
                }
                obj["name"] = msg.name;
                obj["headId"] = msg.headId;
                ws.send(JSON.stringify({"loginOk":true,"clientId":clientIp,"name":obj.name,"msglist":msglist}));
                wsSendMsg("addlog",getMsgInfo(clientIp,obj.name,obj.headId,"我加入聊天了",Date.now()));
            }else if(msg.op=="chatmsg"){
                obj["data"] = msg.data;
                msglist.push(getMsgInfo(clientIp,obj.name,obj.headId,obj.data,Date.now()));
                wsSendMsg("broad",getMsgInfo(clientIp,obj.name,obj.headId,obj.data,Date.now()));
            }
        }
    });

    ws.on("close",function(){
        console.log("close server",clientIp);
        delete clients[clientIp];
        wsSendMsg("addlog",getMsgInfo(clientIp,obj.name,obj.headId,"我退出聊天了",Date.now()));

    });
    ws.on("error",function(){
        //ws.close();
    });
});

console.log("open server port 8036");

function hasName(name){
    for(var i in clients){
        if(clients[i].name==name){
            return true;
        }
    }
    return false;
}
function getMsgInfo(id,name,headId,data,t){
    return {"clientId":id,"name":name,"headId":headId,"data":data,"time":t};
}
function wsSendMsg(op,msgObj){
    for(var i in clients){
        if(!clients.hasOwnProperty(i)){
            continue;
        } 
        var clientSocket = clients[i].ws;
        clientSocket.send(JSON.stringify({
                "op":op,
                "data":msgObj
        }));
    }
}