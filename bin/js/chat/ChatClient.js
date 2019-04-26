/**
* name
*/
var chat;
(function (chat) {
    var ChatClient = /** @class */ (function () {
        function ChatClient() {
            this.byte = new Laya.Byte();
            this.byte.endian = Laya.Byte.LITTLE_ENDIAN;
            this.socket = new Laya.Socket();
            this.socket.endian = Laya.Byte.LITTLE_ENDIAN;
            this.socket.connectByUrl("ws://192.168.3.5:8036");
            this.socket.on(Laya.Event.OPEN, this, this.openHandler);
            this.socket.on(Laya.Event.MESSAGE, this, this.receiveHandler);
            this.socket.on(Laya.Event.CLOSE, this, this.closeHandler);
            this.socket.on(Laya.Event.ERROR, this, this.errorHandler);
            Laya.stage.on(Laya.Event.CLOSE, this, this.closeServer);
        }
        ChatClient.prototype.openHandler = function (e) {
            this.isconnect = true;
            this.addLogin();
        };
        ChatClient.prototype.receiveHandler = function (message) {
            var msg = JSON.parse(message);
            if (msg.hasOwnProperty("nameOk")) {
                this.login.setMsgvis(true);
                this.login.setMsgInfo(msg.nameOk);
            }
            else if (msg.hasOwnProperty("loginOk")) {
                this.clientId = msg.clientId;
                this.addChatView();
                this.chatview.reciveServerMsgList(msg.msglist, this.clientId);
            }
            else if (msg.hasOwnProperty("op")) {
                if (msg.op == "broad") {
                    this.chatview.reciveServerMsg(msg.data, (this.clientId == msg.data.clientId ? false : true));
                    this.chatview.layoutMsg();
                }
                else if (msg.op == "addlog") {
                    this.chatview.reciveServerMsg(msg.data, (this.clientId == msg.data.clientId ? false : true));
                    this.chatview.layoutMsg();
                }
            }
            else if (msg.hasOwnProperty("loginError")) {
                this.login.setMsgvis(true);
                this.login.setMsgInfo(msg.loginError);
            }
        };
        ChatClient.prototype.closeHandler = function (e) {
            this.isconnect = false;
        };
        ChatClient.prototype.errorHandler = function (e) {
        };
        ChatClient.prototype.closeServer = function (e) {
            if (this.isconnect) {
                this.socket.close();
            }
        };
        ChatClient.prototype.addLogin = function () {
            if (this.login == null) {
                this.login = new chat.LoginView();
                Laya.stage.addChild(this.login);
                this.login.on("login", this, this.sendLogin);
                this.login.on("checkname", this, this.checkname);
            }
        };
        ChatClient.prototype.addChatView = function () {
            this.login.visible = false;
            if (this.chatview == null) {
                this.chatview = new chat.ChatView();
                Laya.stage.addChild(this.chatview);
                this.chatview.on("sendmsg", this, this.sendMsg);
            }
        };
        ChatClient.prototype.sendLogin = function (name, head) {
            this.send({ "op": "login", "name": name, "headId": head });
        };
        ChatClient.prototype.checkname = function (name) {
            this.send({ "op": "checkname", "name": name });
        };
        ChatClient.prototype.sendMsg = function (txt) {
            this.send({ "op": "chatmsg", "data": txt });
        };
        ChatClient.prototype.send = function (msg) {
            if (this.isconnect == false)
                return;
            this.socket.send(JSON.stringify(msg));
        };
        return ChatClient;
    }());
    chat.ChatClient = ChatClient;
})(chat || (chat = {}));
//# sourceMappingURL=ChatClient.js.map