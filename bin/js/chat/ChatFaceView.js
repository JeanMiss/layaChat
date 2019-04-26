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
    var ChatFaceView = /** @class */ (function (_super) {
        __extends(ChatFaceView, _super);
        function ChatFaceView() {
            var _this = _super.call(this) || this;
            _this.faceArr = [];
            _this.initUI();
            return _this;
        }
        ChatFaceView.prototype.initUI = function () {
            for (var i = 1; i < 54; i++) {
                this.faceArr.push({ url: "res/face/emoji_" + i + ".png" });
            }
            this.face_list.dataSource = this.faceArr;
            this.face_list.renderHandler = new Laya.Handler(this, this.onRender);
            this.face_list.vScrollBarSkin = "";
            this.face_list.selectEnable = true;
            this.face_list.scrollBar.elasticBackTime = 100;
            this.face_list.scrollBar.elasticDistance = 200;
        };
        ChatFaceView.prototype.onRender = function (item, index) {
            var img = item.getChildByName("face");
            img.skin = this.faceArr[index].url;
            img.on(Laya.Event.CLICK, this, this.onFaceClick, [index]);
        };
        ChatFaceView.prototype.onFaceClick = function (index) {
            this.event("faceType", ["@" + index + "@"]);
            this.visible = false;
        };
        return ChatFaceView;
    }(ui.ChatFaceUI));
    chat.ChatFaceView = ChatFaceView;
})(chat || (chat = {}));
//# sourceMappingURL=ChatFaceView.js.map