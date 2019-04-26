/**
* name 
*/
module chat{
	export class ChatClient{
		private socket:Laya.Socket;
		private byte:Laya.Byte;
		private isconnect:boolean;
		private clientId:string;

		private login:chat.LoginView;
		private chatview:chat.ChatView;

		constructor(){
			this.byte = new Laya.Byte();
			this.byte.endian = Laya.Byte.LITTLE_ENDIAN;

			this.socket = new Laya.Socket();
			this.socket.endian = Laya.Byte.LITTLE_ENDIAN;
			this.socket.connectByUrl("ws://192.168.3.5:8036");
			this.socket.on(Laya.Event.OPEN,this,this.openHandler);
			this.socket.on(Laya.Event.MESSAGE,this,this.receiveHandler);
			this.socket.on(Laya.Event.CLOSE,this,this.closeHandler);
			this.socket.on(Laya.Event.ERROR,this,this.errorHandler);
			Laya.stage.on(Laya.Event.CLOSE,this,this.closeServer);
		}
		private openHandler(e:any):void{
			this.isconnect = true;

			this.addLogin();
			
		}
		private receiveHandler(message:any):void{
			let msg:any = JSON.parse(message);
			if(msg.hasOwnProperty("nameOk")){
				this.login.setMsgvis(true);
				this.login.setMsgInfo(msg.nameOk);
			}else if(msg.hasOwnProperty("loginOk")){
				this.clientId = msg.clientId;
				this.addChatView();
				this.chatview.reciveServerMsgList(msg.msglist,this.clientId);
			}else if(msg.hasOwnProperty("op")){
				if(msg.op=="broad"){
					this.chatview.reciveServerMsg(msg.data,(this.clientId==msg.data.clientId?false:true));
					this.chatview.layoutMsg();
				}else if(msg.op=="addlog"){
					this.chatview.reciveServerMsg(msg.data,(this.clientId==msg.data.clientId?false:true));
					this.chatview.layoutMsg();
				}
			}else if(msg.hasOwnProperty("loginError")){
				this.login.setMsgvis(true);
				this.login.setMsgInfo(msg.loginError);
			}
		}
		private closeHandler(e:any):void{
			this.isconnect = false;
		}
		private errorHandler(e:any):void{
			
		}
		private closeServer(e:any):void{
			if(this.isconnect){
				this.socket.close();
			}
		}
		private addLogin():void{
			if(this.login==null){
				this.login = new chat.LoginView();
				Laya.stage.addChild(this.login);
				this.login.on("login",this,this.sendLogin);
				this.login.on("checkname",this,this.checkname);
			}
		}
		private addChatView():void{
			this.login.visible = false;
			if(this.chatview==null){
				this.chatview = new chat.ChatView();
				Laya.stage.addChild(this.chatview);
				this.chatview.on("sendmsg",this,this.sendMsg);
			}
		}
		private sendLogin(name:string,head:number):void{
			this.send({"op":"login","name":name,"headId":head})
		}
		private checkname(name:string):void{
			this.send({"op":"checkname","name":name});
		}
		private sendMsg(txt:string):void{
			this.send({"op":"chatmsg","data":txt});
		}
		public send(msg:Object):void{
			if(this.isconnect==false) return;
			this.socket.send(JSON.stringify(msg));
		}


	}
}