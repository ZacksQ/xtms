var menuitem = '';
if(menuitem!=''){
    console.log(menuitem);
  }else{
    console.log("undefined var")
  }
$('body').on('click', '.topclass>li a', function () {
  //$(".topclass>li.active").find("ul").slideUp().parent().removeClass("active");
  //$(this).parent().siblings().children('ul').hide();
  $(this).parent().addClass("active").find("ul").stop(true, false).slideToggle();
  // sessionStorage.firstLabel = $(this).text();

})
$('body').on('click', '.topclass>li>ul li', function () {
  sessionStorage.secondLabel = $(this).children('a').text();
})
$(".media-selectstate").click(function () {
  selectedmedia($(this));
});

function selectedmedia(obj) {
  $(".media-list li[class=selected]").removeClass("selected");
  $(obj).parent().toggleClass("selected");
}

function GetRequest(){
      var url = location.search;
       var theRequest = new Object();
       if (url.indexOf("?") != -1) {
          var str = url.substr(1);
          strs = str.split("&");
          for(var i = 0; i < strs.length; i ++) {
             theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
          }
       }
       return theRequest;
    }

$.get('navBar.html').done(function (n) {
  var request = GetRequest();
  $('#navBar').html(n);
  $("#navBar a").each(function(){
     var _this = $(this);
     _this.attr("href",_this.attr("href")=="javascript:;"?"javascript:;":_this.attr("href")+"?liveid="+request["liveid"]);
  });
  // var seocndLi = $('.topclass>li>ul>li');
  // for (var i = 0; i < seocndLi.length; i++) {
  //   if (seocndLi.eq(i).children('a').text() == sessionStorage.secondLabel) {
  //     seocndLi.eq(i).addClass('active');
  //     seocndLi.eq(i).parent().show();
  //     //sessionStorage.secondLabel ='';
  //   }
  // }
  // var firstLi = $('.topclass>li');
  // for (var i = 0; i < firstLi.length; i++) {
  //   if (firstLi.eq(i).children('a').text() == sessionStorage.firstLabel) {
  //     firstLi.eq(i).addClass('active').siblings().removeClass('active');
  //     firstLi.eq(i).siblings().children('ul').hide();
  //   }
  // }
})

$.get("accountNav.html").done(function(d){
  $('#account').html(d);
});

function getcn(type){
  $.get("cn.html").done(function(d){
    $('.cn').html(d);
    $("."+type).addClass("active")
    // $(".monitor").attr("href","monitor.html?liveid="+liveid);
    // $(".channel").attr("href","channel.html?liveid="+liveid);
    $(".cn a").each(function(){
        var _this = $(this);
        _this.attr("href",_this.attr("href")+"?liveid="+liveid);
    })
  });
}

var count=5;
var pageSize=parseInt(count);
$.get("header.html").done(function(d){
  loadProductcount(0);
  $('header.top').html(d);
  $(".msgshow").click(function(){
    loadProduct2(0);
    $("#msg-box").toggleClass("hide");
  });
  $(".msgshow").on("click",function(e){
    e.stopPropagation();
  });
  $(document).on('click', function(e) {
    $('#msg-box').addClass('hide');
    $(".im-wrap").removeClass("showemoji");
  });
  $("#leave").click(function(){
    layui.use(['layer'], function(args){
      layer.open({
        content: '是否确认退出'
        ,btn: ['确定', '取消']
        ,yes: function(index, layero){
          //按钮【按钮一】的回调
          leavelogin();
        }
        ,cancel: function(){

        }
      });
    });

    //var n=confirm("是否确认退出");
    //if(n){
    //
    //}
  })
});
function loadProduct2(start){
  var url='http://www.xiangtazhibo.com/newlive/mMsg/getMsgList.do';
  $.ajax({
    url:url,
    type:'post',
    datatype:'json',
    data:{"startRecordNum":start,"perNumber":pageSize},
    success:function(data){
      var pno= parseInt(data.currentPage);
      var pagetotle=parseInt(data.pageCount);
      //console.log(data.totalCount);
      var html='';
      if(data.totalCount==0){
        html='<li><a href="javascript:;" style="cursor:context-menu; text-align:center">暂无消息</a></li>';
      }else{
        for(var i=0;i<data.data.msgList.length;i++){
          var p=data.data.msgList[i];;
          html+=
              '<li id="'+ p.sendid+'"><a href="messagedetial.html?id='+p.id+'">'+p.sendname+'<span class="fr">'+p.sendtimestr+'</span></a></li>'
          ;
        }
        
        //$("#num").text(data.totalCount);
      }
      $("#msg-inform2").html(html);
    }
  })
}
function loadProductcount(start){
  var url='http://www.xiangtazhibo.com/newlive/mMsg/getMsgList.do';
  $.ajax({
    url:url,
    type:'post',
    datatype:'json',
    data:{"startRecordNum":start,"perNumber":pageSize},
    success:function(data){
      var pno= parseInt(data.currentPage);
      var pagetotle=parseInt(data.pageCount);
        $("#num").text(data.totalCount);
    }
  })
}
$(function(){
  var url='http://www.xiangtazhibo.com/newlive/muser/getAccount.do';
  $.ajax({
    url:url,
    type:'get',
    dataType:'json',
    success:function(data){
      //console.log(data.data.nikename);
      if(data["success"])
        $('#uname').text(data.data.nikename);
      else
        location.href = "http://www.xiangtazhibo.com/newlive/webow/login.html";
    }
  })
})

function leavelogin(){
  $.ajax({
    url:'http://www.xiangtazhibo.com/newlive/muser/loginout.do',
    type:'post',
    dataType:'json',
    success:function(data){
      //console.log(data);
      location.href='http://www.xiangtazhibo.com/newlive/webow/login.html';
    }
  })
}