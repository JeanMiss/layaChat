// 程序入口
class GameMain{
    constructor()
    {
        Laya.init(600,840);
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        Laya.stage.bgColor = "#ffffff";

        this.addChat();
    }
    private addChat():void{
        Laya.loader.load(["res/atlas/chat.atlas"],Laya.Handler.create(this,this.loadChat));
    }
    private loadChat():void{
        var ct:chat.ChatClient = new chat.ChatClient();

        //var t:chat.ChatView = new chat.ChatView();
        //Laya.stage.addChild(t);
    }
}
new GameMain();