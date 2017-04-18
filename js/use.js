/**
 * Created by MafuyuShinna on 2017/2/14.
 */
//统一url
var website = "http://www.xiangtazhibo.com/newlive/";
 // var website = "http://localhost/newlive/";

//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

var liveid = null;

$(function(){
    //获取url中的参数
    liveid = getUrlParam("liveid");
    // liveid = '2';
    if(liveid == null || liveid == ''){
        // alert("livei为空，后续需要做处理");
    }
})