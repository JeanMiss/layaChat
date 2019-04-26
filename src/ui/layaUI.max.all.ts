
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class ChatUI extends View {
		public panel:Laya.Panel;
		public btn_send:Laya.Button;
		public btn_face:Laya.Image;
		public lb_input:Laya.TextInput;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":840},"child":[{"type":"Panel","props":{"y":7,"x":6,"width":589,"var":"panel","height":760}},{"type":"Box","props":{"y":774,"x":3,"mouseEnabled":true},"child":[{"type":"Image","props":{"width":448,"skin":"chat/bg023_png.png","sizeGrid":"5,5,5,5","height":64}},{"type":"Button","props":{"y":3,"x":505,"width":87,"var":"btn_send","stateNum":1,"skin":"chat/bg014_png.png","sizeGrid":"8,8,8,8","labelStrokeColor":"0x0","labelSize":30,"labelPadding":"-2","labelColors":"0xffffff","label":"send","height":57}},{"type":"Image","props":{"y":5,"x":452,"var":"btn_face","skin":"chat/face.png"}},{"type":"TextInput","props":{"y":6,"x":7,"width":436,"var":"lb_input","skin":"comp/textinput.png","height":53,"color":"#3a717c"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.ChatUI.uiView);

        }

    }
}

module ui {
    export class ChatFaceUI extends View {
		public face_list:Laya.List;

        public static  uiView:any ={"type":"View","props":{"width":255,"height":165},"child":[{"type":"Image","props":{"y":0,"x":0,"width":255,"skin":"chat/bg009_1_png.png","sizeGrid":"10,10,10,10","height":165}},{"type":"List","props":{"y":2,"x":4,"var":"face_list","repeatY":3,"repeatX":5},"child":[{"type":"Box","props":{"name":"render"},"child":[{"type":"Image","props":{"y":1,"x":0,"skin":"chat/face.png","name":"face"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.ChatFaceUI.uiView);

        }

    }
}

module ui {
    export class LoginUI extends View {
		public head:Laya.Image;
		public btn_login:Laya.Button;
		public lb_msg:Laya.Label;
		public lb_name:Laya.TextInput;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":840},"child":[{"type":"Image","props":{"y":240,"x":236,"var":"head","skin":"chat/head1.png"}},{"type":"Button","props":{"y":538,"x":240,"width":140,"var":"btn_login","stateNum":1,"skin":"chat/bg051_3_png.png","sizeGrid":"8,8,8,8","labelStrokeColor":"0x0","labelSize":24,"labelColors":"0xFFFFFF,0xFFFFFF","label":"登录","height":50}},{"type":"Label","props":{"y":376,"x":53,"width":478,"var":"lb_msg","text":"label","height":32,"fontSize":20,"color":"#f87157","align":"center"}},{"type":"TextInput","props":{"y":420,"x":197,"width":210,"var":"lb_name","skin":"comp/textinput.png","promptColor":"#9a9696","prompt":"请输入用户名","height":35,"color":"#5e6d70","borderColor":"#125353"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.LoginUI.uiView);

        }

    }
}
