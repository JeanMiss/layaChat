/**
* name 
*/
module chat{
	export class ChatLineView extends Laya.Box{
		private headIcon:Laya.Image;
		private lb_name:Laya.Text;
		private isleft:boolean;
		private txtfiled:Laya.HTMLDivElement;

		constructor(){
			super();
		}
		public init(msgOjb:Object,isleft:boolean):void{
			if(this.txtfiled==null){
				this.headIcon = new Laya.Image();
				this.headIcon.scale(0.5,0.5);
				this.addChild(this.headIcon);

				this.lb_name = new Laya.Text();
				this.lb_name.fontSize = 30;
				this.lb_name.color = "#ff0000";
				this.addChild(this.lb_name);
				this.lb_name.y = 0;
				this.lb_name.visible = true;

				this.txtfiled = new Laya.HTMLDivElement();
				this.addChild(this.txtfiled);
				this.txtfiled.x = 65;

			}
			this.txtfiled.style.fontSize = 25;
			this.txtfiled.style.color = "#000000";
			this.txtfiled.style.valign = "middle";

			this.isleft = isleft;

			if(msgOjb==null) return;
			this.headIcon.texture = Laya.loader.getRes("chat/head"+msgOjb["headId"]+".png");
			this.lb_name.text = msgOjb["name"];
			
			//var head:string = this.getImgStr("chat/head"+msgOjb["headId"]+".png");
			//var clientName:string = this.getSpanStr(msgOjb["name"],"#ffcc00");
			let clientInfo:string = this.getFaceImgStr(msgOjb["data"]);
			this.txtfiled.innerHTML = clientInfo;
			
			this.layout();
		}
		private layout():void{
			if(this.isleft){
				this.headIcon.x = 0;
				this.lb_name.x = this.headIcon.texture.width*.5+10;
				this.txtfiled.x = this.headIcon.texture.width*.5+10;
			}else{
				this.headIcon.x = Laya.stage.width-this.headIcon.texture.width*.5-10;
				this.lb_name.x = this.headIcon.x-this.lb_name.textWidth-10;
				this.txtfiled.x = this.headIcon.x-this.txtfiled.contextWidth-10;
			}
			this.txtfiled.y = (this.headIcon.texture.height*0.5-this.txtfiled.contextHeight)/2+30;
			//this.txtfiled.y = 50;
			
		}
		private getSpanStr(str:string,color:string):string{
			return "<span style='color:"+color+";'>"+str+"</span>";
		}
		private getImgStr(url:string):string{
			return "<img src='"+url+"' style='width:40px; height:40px;'/>";
		}
		private getFaceImgStr(str:string):string
		{
			var reg:RegExp = /@[1-9]{1,2}@/g;
			var arr:any = str.match(reg);
			if(arr==null) return this.getSpanStr(str,"#000000");
			var newChatStr:string = str;
			for(let i:number=0;i<arr.length;i++){
				let faceId:number = arr[i].slice(1,-1);
				newChatStr = newChatStr.replace(reg,this.getImgStr("res/face/emoji_"+faceId+".png"));
			}
			return newChatStr;
		}
		public test():void{
			this.headIcon.texture = Laya.loader.getRes("chat/head1.png");
			this.lb_name.text = "LayaBox";
			this.txtfiled.innerHTML= this.getImgStr("res/face/emoji_2.png")+"欢迎你的加入";
			this.txtfiled.y = (this.headIcon.texture.height*0.5-this.txtfiled.contextHeight)/2;
			
			//this.getSpanStr("LayaBox","#ff0000")+
			//this.getSpanStr("欢迎你的加入","#ffff00")+
			//this.getImgStr("face/emoji_1.png");

			// var str:string = "";
			// str += "<article><header><h1>我是article</h1><p>1小时前</p></header><p>这篇文章很不错啊，顶一下！</p></article>";
			// this.txtfiled.innerHTML = str;
		}
		public get realW():number{
			var wp:number = this.headIcon.texture.width*.5+this.lb_name.textHeight;
			return Math.max(wp,this.txtfiled.contextWidth)+5;
		}
		public get realH():number{
			var hp:number = this.headIcon.texture.height*.5+this.lb_name.textHeight;
			return Math.max(hp,this.txtfiled.contextHeight)+5;
		}
		
	}
}