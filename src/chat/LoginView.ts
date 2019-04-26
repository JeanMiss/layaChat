/**
* name 
*/
module chat{
	export class LoginView extends ui.LoginUI{
		private isSameName:boolean = false;
		private headId:number=1;
		constructor(){
			super();

			Laya.Font.defaultFont = "黑体";
			Laya.Font.defaultSize = 24;

			this.initUI();
		}
		private initUI():void{
			this.lb_name.bgColor = null;
			this.lb_msg.visible = false;
			this.lb_msg.text = "您的昵称已被占用，请重新输入";
			this.lb_name.on(Laya.Event.INPUT,this,this.onInput);
			this.lb_name.on(Laya.Event.BLUR,this,this.onIsName);
			this.btn_login.on(Laya.Event.MOUSE_DOWN,this,this.onLogin);
		}
		private onInput(e:Laya.Event):void{
			this.lb_msg.visible = false;
		}
		public setMsgvis(v:boolean):void{
			this.lb_msg.visible = v;
		}
		public setMsgInfo(txt:string):void{
			this.lb_msg.text = txt;
		}
		private onIsName(e:Laya.Event):void{
			let str:string = this.lb_name.text;
			this.event("checkname",[this.lb_name.text]);
		}
		private onLogin(e:Laya.Event):void{
			if(this.lb_name.text==""){
				this.lb_msg.text = "请输入你的昵称";
				return;
			}
			this.event("login",[this.lb_name.text,this.headId]);

		}
	}
}