/**
* name 
*/
module chat{
	export class ChatView extends ui.ChatUI{
		private chatface:chat.ChatFaceView;
		private msgList:Array<ChatLineView>=[];
		constructor(){
			super();
			this.initUI();
		}
		private initUI():void{
			this.lb_input.bgColor = null;
			this.panel.vScrollBarSkin = "";
			this.panel.vScrollBar.elasticBackTime = 50;
			this.panel.vScrollBar.elasticDistance = 100;
			
			
			this.btn_face.on(Laya.Event.MOUSE_DOWN,this,this.onFace);
			this.btn_send.on(Laya.Event.MOUSE_DOWN,this,this.onSend);
		}
		private onFace():void{
			if(this.chatface==null){
				this.chatface = new chat.ChatFaceView();
				this.chatface.on("faceType",this,this.onGetFaceType);
				this.chatface.pos(335,608);
				this.addChild(this.chatface);
				this.chatface.visible = false;
			}
			this.chatface.visible = !this.chatface.visible;
		}
		private onGetFaceType(type:string):void{
			this.lb_input.text += type;
		}
		private onSend():void{
			if(this.lb_input.text=="") return;
			let v:number = Math.floor(Math.random()*2);
			//this.reciveServerMsg({"name":"欧塞尔","headId":1,"data":this.lb_input.text},v==0?false:true);
			this.event("sendmsg",[this.lb_input.text]);
			this.lb_input.text = "";
		}
		public reciveServerMsgList(arr:any[],clientId:string):void{
			if(arr==null) {
				return;
			}
			for(let i:number=0;i<arr.length;i++){
				this.reciveServerMsg(arr[i],(clientId==arr[i].clientId?false:true));
			}
			this.layoutMsg();
		}
		public reciveServerMsg(obj:Object,isleft:boolean):void{
			let line:ChatLineView = new ChatLineView();
			line.init(obj,isleft);
			line.y = this.msgList.length*line.realH;
			line.size(line.realW,line.realH);
			this.msgList.push(line);
			this.panel.addChild(line);
		}
		public layoutMsg():void
		{
			Laya.timer.once(500,this,this.relScroll);
		}
		private relScroll():void{
			if(this.panel.contentHeight>this.panel.height){		
				this.panel.scrollTo(0,this.panel.contentHeight+90);
			}
		}

	}
}