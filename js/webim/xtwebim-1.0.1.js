/*
    By zq 2016.12.28
    description: 环信 WEBIM 聊天功能实现
*/
var easemob = (function(){
                var conn = new WebIM.connection({ //create connection
                    https: WebIM.config.https,
                    url: WebIM.config.xmppURL,
                    isAutoLogin: WebIM.config.isAutoLogin,
                    isMultiLoginSessions: WebIM.config.isMultiLoginSessions
                });

                var roomId = '';

                var options = { 
                  apiUrl: WebIM.config.apiURL,
                  user: '',
                  pwd: '',
                  appKey: WebIM.config.appkey
                };

                var chatroomoption = {
                    apiUrl: WebIM.config.apiURL,
                    pagenum: 1,                                 // 页数
                    pagesize: 20,                               // 每页个数
                    success: function (list) {
                        console.log(list);
                    },
                    error: function () {
                        console.log('List chat room error');
                    }
                };

                // var user={};

                var initWEBIM = function(){         //WEBIM init        
                    conn.listen({
                        onOpened: function ( message ) {          //conntection opened
                            console.log("connect successfully");
                            // join chartroom
                            conn.joinChatRoom({
                                roomId: easemob.roomId
                            });
                        },  
                        onClosed: function ( message ) {
                            console.log('connection close');
                        },    //connection closed
                        onTextMessage: function ( message ) {
                            // console.log("get message"); 
                            if(message.type=="chat" && message.delay == undefined){
                                console.log(message);
                                appendMsg(message,'txt');                            
                            }
                        },    //收到文本消息
                        onEmojiMessage: function ( message ) {
                            // console.log(message);
                            // console.log("parse:",WebIM.utils.parseEmoji(message));
                            if(message.type=="chat" && message.delay == undefined){
                                console.log(message);
                                appendMsg(message,'emoji');
                            }
                            // var msgbody="";
                            // var data = message.data;
                            // for(var i = 0 , l = data.length ; i < l ; i++){
                            //     msgbody+=data[i];
                            // }

                        },   //收到表情消息
                        onPictureMessage: function ( message ) {}, //收到图片消息
                        onCmdMessage: function ( message ) {},     //收到命令消息
                        onAudioMessage: function ( message ) {},   //收到音频消息
                        onLocationMessage: function ( message ) {},//收到位置消息
                        onFileMessage: function ( message ) {},    //收到文件消息
                        onReceivedMessage: function ( message ){},
                        onVideoMessage: function (message) {
                            var node = document.getElementById('privateVideo');
                            var option = {
                                url: message.url,
                                headers: {
                                  'Accept': 'audio/mp4'
                                },
                                onFileDownloadComplete: function (response) {
                                    var objectURL = WebIM.utils.parseDownloadResponse.call(conn, response);
                                    node.src = objectURL;
                                },
                                onFileDownloadError: function () {  
                                    console.log('File down load error.')
                                }
                            };
                            WebIM.utils.download.call(conn, option);
                        },   //收到视频消息
                        onPresence: function ( message ) {
                            handlePresence(message);
                        },       //收到联系人订阅请求、处理群组、聊天室被踢解散等消息
                        onRoster: function ( message ) {},         //处理好友申请
                        onInviteMessage: function ( message ) {},  //处理群组邀请
                        onOnline: function () {},                  //本机网络连接成功
                        onOffline: function () {},                 //本机网络掉线
                        onError: function ( message ) {},          //失败回调
                        onBlacklistUpdate: function (list) {       //黑名单变动
                            //黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
                            console.log(list);
                        }
                });
                conn.open(options);
            }

            var handlePresence = function ( e ) { //join chatroom state
              /*e.type === 'joinChatRoomSuccess' //加入成功
                e.type === 'deleteGroupChat' //聊天室被删除
                e.type === 'joinChatRoomFailed' //加入失败*/
                console.log(e.type);
            }

            //用templete改
            var appendMsg = function(message,type){
                
                // var msgbody='',
                //     msgnode = document.createElement("li"),
                //     headimgnode = document.createElement("img"),
                //     message_type = message["ext"]["type"];

                // headimgnode.setAttribute("src",message["ext"]["headimg"]);
                // var headerdiv = document.createElement('div');
                // headerdiv.setAttribute("class","user-avatar fl");
                // headerdiv.appendChild(headimgnode);
                // var messagediv = document.createElement('div');                
                // messagediv.setAttribute("class","msg-body fl");
                // var nicknamediv = document.createElement("div");
                
                // var msgp = document.createElement("p"),
                data = message.data||message.msg;
                var ext = typeof(message["ext"])=="object"?message["ext"]:JSON.parse(message["ext"]);
                var nickname = ext["nickname"]||ext["username"],
                    headimg = ext["headimg"],
                    msgbody = ``,
                    message_type = ext["type"],
                    message_id = ext["msgid"],
                    message_usertype = ext["usertype"],
                    message_sendtime = ext["sendtime"],
                    usertype = null;
                switch(message_type){
                    case 1:
                        switch(type){
                            case 'txt':
                                msgbody = data||message.msg;
                                msgbody=WebIM.utils.parseEmoji(encode(msgbody));
                            break;
                            case 'emoji':                                
                                for(var i = 0 , l = data.length ; i < l ; i++){
                                    var msgitem = data[i].data;
                                    if(data[i].type == "emoji"){
                                        msgbody += `<img src="${data[i].data}">`
                                    }else if(data[i].type == "txt"){   
                                        msgbody += `${data[i].data}`;
                                    }
                                }
                            break;
                        }    
                    break;
                    case 7:
                        msgbody = `<img src="${data}" class="im-pic" />`;
                    break;
                    // case 3:
                    //     messagediv.setAttribute("class","message fl robredpacket");
                    //     messagediv.setAttribute("data-rpid",JSON.parse(data).hongbaoid);
                    //     $(messagediv).click(function(){
                    //         var _this = $(this);
                            
                    //         xtAPI.getredpacket(_this.attr("data-rpid"));
                    //     });                        
                    //     msgp.setAttribute("class","message-content redpacket-f");
                    //     msgp.innerHTML = '<div class="rptxt"><p>' + JSON.parse(data).txt + '</p><p>领取红包</p></div>';
                    //     var imgnode = document.createElement("img");
                    //     imgnode.setAttribute("src","images/redpacket-xl.png");
                    //     imgnode.setAttribute("class","response");
                    //     msgp.appendChild(imgnode);
                    // break;
                    // case 5:
                    //     nicknamediv.appendChild(document.createTextNode(message["ext"]["nickname"]||message["ext"]["username"]));
                    //     nicknamediv.setAttribute("class","nickname");
                    //     messagediv.appendChild(nicknamediv);
                    //     // console.log(JSON.parse(data).txt)
                    //     msgp.setAttribute("class","message-content redpacket-f");
                    //     msgp.innerHTML = JSON.parse(data).txt + ' <img src="images/redpacket_s.png" class="redpacket-s" alt="">';
                    //     // var textnode = document.createTextNode(encode(JSON.parse(data).txt));
                    //     // msgp.innerHTML = msgp.innerHTML + '<img src="images/redpacket_s.png" class="redpacket-s" alt="">';
                    //     // msgp.appendChild(textnode);
                    // break;
                    // case 6:
                    //     var data = JSON.parse(data);
                    //     msgnode.setAttribute("class","sys-getrp");
                    //     msgp.innerHTML = data.username + '领取了' + data.hostname + '的红包';
                    // break;
                }
                        
                // messagediv.appendChild(msgp);
                // msgnode.appendChild(headerdiv);
                // msgnode.appendChild(messagediv);
                switch(message_usertype){
                    case "ower":
                        usertype = "管理员";
                    break;
                    case "viewer":
                        usertype = "观众";
                    break;
                }
                msgnode = /*String.raw*/`<li data-msgid=${message_id}>
                                <div class="user-avatar fl">
                                    <img src="${headimg}" alt="">
                                </div>
                                <div class="msg-body fl">
                                    <div class="user-info blue">${nickname}<span>${usertype}</span></div>
                                    <div class="msg-content">${msgbody}</div>
                                </div>
                                <div class="msg-operate">
                                    <span>${message_sendtime}</span>`+
                                    (message_usertype != 'ower'?
                                    `<div>`+
                                        (ext["ischeck"]?`<button class="btn-media pass" onclick="passmsg('${message_id}')">通过</button>`:``)+
                                        `
                                        <button class="btn-mediact del" onclick="delmsg('${message_id}')">删除</button>
                                    </div>`:``)+
                                `</div>
                            </li>`;
                $(".im-msg-list ul").append(msgnode);
                $(".msgnum").text(parseInt($(".msgnum").text())+1+'条');
                // applicationInit.scrollIntoView();

            };

            var sendToAPI = function(txt){
                if(txt == "") return false;
                $.ajax({
                    url : xtAPI.commonUrl + 'newlive/im/sendMsg.do',
                    type : "post",
                    dataType : "json",
                    data : {
                        "usercode" : localStorage.getItem("usercode"),
                        "groupid" : easemob.roomId,
                        "msg" : txt
                    },
                    success:function(){
                        applicationInit.scrollIntoView();
                        $("#msg-input").val('');
                        $(".im-wrap").removeClass("showemoji");
                    }
                });
            };

            var sendMsg = function(txt){
                    if(txt == "")return false;
                    var id = conn.getUniqueId();         // 生成本地消息id
                    var msg = new WebIM.message('txt', id); // 创建文本消息
                    var option = {
                        msg: txt, // message content
                        to: easemob.roomId,               // 接收消息对象(聊天室id)
                        roomType: true,
                        chatType: 'chatRoom',
                        ext : {"nickname":localStorage.getItem("nickname"),"headimg":localStorage.getItem("headimg")},
                        success: function () {
                            console.log('send room text success');
                            applicationInit.scrollIntoView();
                            $("#msg-input").val('');
                            $(".im-wrap").removeClass("showemoji");
                        },
                        fail: function () {
                            console.log('failed');
                        }
                    };
                    msg.set(option);
                    msg.setGroup('groupchat');
                    conn.send(msg.body);
                    console.log(msg);
                    appendMsg(msg.body,'txt');
            }

            var getChatRooms = function(){
                conn.getChatRooms(chatroomoption);
            }

            var encode = function(str) {
                if (!str || str.length === 0) {
                    return '';
                }
                var s = '';
                s = str.replace(/&amp;/g, "&");
                s = s.replace(/<(?=[^o][^)])/g, "&lt;");
                s = s.replace(/>/g, "&gt;");
                s = s.replace(/\"/g, "&quot;");
                s = s.replace(/\n/g, "<br>");
                return s;
            }

            return {
                roomId : roomId,
                options : options,
                initWEBIM : initWEBIM,//初始化WEBIM
                sendMsg : sendMsg, //发送信息
                getChatRooms : getChatRooms, //获取所有聊天室
                sendToAPI : sendToAPI,
                appendMsg : appendMsg
            }
        })();