// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.init(600, 840);
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        Laya.stage.bgColor = "#ffffff";
        this.addChat();
    }
    GameMain.prototype.addChat = function () {
        Laya.loader.load(["res/atlas/chat.atlas"], Laya.Handler.create(this, this.loadChat));
    };
    GameMain.prototype.loadChat = function () {
        var ct = new chat.ChatClient();
        //var t:chat.ChatView = new chat.ChatView();
        //Laya.stage.addChild(t);
    };
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=LayaSample.js.map