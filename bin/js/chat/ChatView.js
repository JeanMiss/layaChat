var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* name
*/
var chat;
(function (chat) {
    var ChatView = /** @class */ (function (_super) {
        __extends(ChatView, _super);
        function ChatView() {
            var _this = _super.call(this) || this;
            _this.msgList = [];
            _this.initUI();
            return _this;
        }
        ChatView.prototype.initUI = function () {
            this.lb_input.bgColor = null;
            this.panel.vScrollBarSkin = "";
            this.panel.vScrollBar.elasticBackTime = 50;
            this.panel.vScrollBar.elasticDistance = 100;
            this.btn_face.on(Laya.Event.MOUSE_DOWN, this, this.onFace);
            this.btn_send.on(Laya.Event.MOUSE_DOWN, this, this.onSend);
        };
        ChatView.prototype.onFace = function () {
            if (this.chatface == null) {
                this.chatface = new chat.ChatFaceView();
                this.chatface.on("faceType", this, this.onGetFaceType);
                this.chatface.pos(335, 608);
                this.addChild(this.chatface);
                this.chatface.visible = false;
            }
            this.chatface.visible = !this.chatface.visible;
        };
        ChatView.prototype.onGetFaceType = function (type) {
            this.lb_input.text += type;
        };
        ChatView.prototype.onSend = function () {
            if (this.lb_input.text == "")
                return;
            var v = Math.floor(Math.random() * 2);
            //this.reciveServerMsg({"name":"欧塞尔","headId":1,"data":this.lb_input.text},v==0?false:true);
            this.event("sendmsg", [this.lb_input.text]);
            this.lb_input.text = "";
        };
        ChatView.prototype.reciveServerMsgList = function (arr, clientId) {
            if (arr == null) {
                return;
            }
            for (var i = 0; i < arr.length; i++) {
                this.reciveServerMsg(arr[i], (clientId == arr[i].clientId ? false : true));
            }
            this.layoutMsg();
        };
        ChatView.prototype.reciveServerMsg = function (obj, isleft) {
            var line = new chat.ChatLineView();
            line.init(obj, isleft);
            line.y = this.msgList.length * line.realH;
            line.size(line.realW, line.realH);
            this.msgList.push(line);
            this.panel.addChild(line);
        };
        ChatView.prototype.layoutMsg = function () {
            Laya.timer.once(500, this, this.relScroll);
        };
        ChatView.prototype.relScroll = function () {
            if (this.panel.contentHeight > this.panel.height) {
                this.panel.scrollTo(0, this.panel.contentHeight + 90);
            }
        };
        return ChatView;
    }(ui.ChatUI));
    chat.ChatView = ChatView;
})(chat || (chat = {}));
//# sourceMappingURL=ChatView.js.map