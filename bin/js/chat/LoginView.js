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
    var LoginView = /** @class */ (function (_super) {
        __extends(LoginView, _super);
        function LoginView() {
            var _this = _super.call(this) || this;
            _this.isSameName = false;
            _this.headId = 1;
            Laya.Font.defaultFont = "黑体";
            Laya.Font.defaultSize = 24;
            _this.initUI();
            return _this;
        }
        LoginView.prototype.initUI = function () {
            this.lb_name.bgColor = null;
            this.lb_msg.visible = false;
            this.lb_msg.text = "您的昵称已被占用，请重新输入";
            this.lb_name.on(Laya.Event.INPUT, this, this.onInput);
            this.lb_name.on(Laya.Event.BLUR, this, this.onIsName);
            this.btn_login.on(Laya.Event.MOUSE_DOWN, this, this.onLogin);
        };
        LoginView.prototype.onInput = function (e) {
            this.lb_msg.visible = false;
        };
        LoginView.prototype.setMsgvis = function (v) {
            this.lb_msg.visible = v;
        };
        LoginView.prototype.setMsgInfo = function (txt) {
            this.lb_msg.text = txt;
        };
        LoginView.prototype.onIsName = function (e) {
            var str = this.lb_name.text;
            this.event("checkname", [this.lb_name.text]);
        };
        LoginView.prototype.onLogin = function (e) {
            if (this.lb_name.text == "") {
                this.lb_msg.text = "请输入你的昵称";
                return;
            }
            this.event("login", [this.lb_name.text, this.headId]);
        };
        return LoginView;
    }(ui.LoginUI));
    chat.LoginView = LoginView;
})(chat || (chat = {}));
//# sourceMappingURL=LoginView.js.map