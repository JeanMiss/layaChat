/**
* name 
*/
module chat{
	export class ChatFaceView extends ui.ChatFaceUI{
		private faceArr:any=[];
		constructor(){
			super();
			this.initUI();
		}
		private initUI():void{
			for(let i:number=1;i<54;i++){
				this.faceArr.push({url:"res/face/emoji_"+i+".png"});
			}
			this.face_list.dataSource = this.faceArr;
			this.face_list.renderHandler = new Laya.Handler(this,this.onRender);
			this.face_list.vScrollBarSkin = "";
			this.face_list.selectEnable = true;
			this.face_list.scrollBar.elasticBackTime = 100;
			this.face_list.scrollBar.elasticDistance = 200;
		}
		private onRender(item:Laya.Box,index:number):void{
			let img:Laya.Image = item.getChildByName("face") as Laya.Image;
			img.skin = this.faceArr[index].url;
			img.on(Laya.Event.CLICK,this,this.onFaceClick,[index]);
		}
		private onFaceClick(index:number):void{
			this.event("faceType",["@"+index+"@"]);
			this.visible = false;
		}
	}
}