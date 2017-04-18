var count=6;
var pageSize=parseInt(count);
$(function(){
    getrewardrecord(1,pageSize);
})
$("#date_look").click(function(){
    var start=$("#LAY_demorange_s").val();
    var end=$("#LAY_demorange_e").val();
    console.log(start,end);
    getrewardrecord2(start,end,0,pageSize);
    window.sessionStorage.setItem("start",start);
    window.sessionStorage.setItem("end",end);
})
$("#list").on("click","li",function(e){
    e.preventDefault()
    var page=parseInt($(this).find("a").attr("href"));
    var start=page*pageSize-pageSize;
    var starttime=window.sessionStorage.getItem("start");
    var end=window.sessionStorage.getItem("end");
    if(starttime==''||end==''){
        getrewardrecord(start,pageSize)
    }else{
        getrewardrecord2(starttime,end,start,pageSize);
    }
})
function getrewardrecord2(start,end,startNum,perNum){
    var url="http://www.xiangtazhibo.com/newlive/mGiftrecord/getBeGiftrecord.do";
    $.ajax({
        url:url,
        type:"post",
        dataType:"json",
        data:{"startTime":start,"endTime":end,"startNum":startNum,"perNum":perNum},
        success:function(data){
            //console.log(data);
            var pno= parseInt(data.pageCount);
            var pagetotle=parseInt(data.totalCount/pageSize);
            var html='';
            for(var i=0;i<data.data.list.length;i++){
                var p=data.data.list[i];
                html+='<tr><td>'+ p.id+'</td><td>'+ p.giftname+'</td><td>'+ p.sendmoney+'</td><td>'+ p.createtime+'</td><td>'+ p.username+'</td></tr>';
            }
            $("#getrewardrecord").html(html);
            var pagelist="";
            if(pno-3>0){
                pagelist+='<li><a href="'+parseInt(pno-3)+'">'+parseInt(pno-3)+'</a></li>';
            }
            if(pno-2>0){
                pagelist+='<li><a href="'+parseInt(pno-2)+'">'+parseInt(pno-2)+'</a></li>';
            }
            if(pno-1>0){
                pagelist+='<li><a href="'+parseInt(pno-1)+'">'+parseInt(pno-1)+'</a></li>';
            }
            pagelist+='<li><a href="'+pno+'" class="active">'+ pno+'</a></li>';
            if(pno+1<=pagetotle){
                pagelist+='<li><a href="'+parseInt(pno+1)+'">'+parseInt(pno+1)+'</a></li>';
            }
            if(pno+2<=pagetotle){
                pagelist+='<li><a href="'+parseInt(pno+2)+'">'+parseInt(pno+2)+'</a></li>';
            }
            if(pno+3<=pagetotle){
                pagelist+='<li><a href="'+parseInt(pno+3)+'">'+parseInt(pno+3)+'</a></li>';
            }
            $("#list").html(pagelist);
        }
    })
}
function getrewardrecord(startNum,perNum){
    var url="http://www.xiangtazhibo.com/newlive/mGiftrecord/getBeGiftrecord.do";
    $.ajax({
        url:url,
        type:"post",
        dataType:"json",
        data:{"startNum":startNum,"perNum":perNum},
        success:function(data){
            var pno= parseInt(data.pageCount);
            var pagetotle=parseInt(data.totalCount/pageSize);
            console.log(pno,pagetotle);
            var html='';
            for(var i=0;i<data.data.list.length;i++){
                var p=data.data.list[i];
                html+='<tr><td>'+ p.id+'</td><td>'+ p.giftname+'</td><td>'+ p.sendmoney+'</td><td>'+ p.createtime+'</td><td>'+ p.username+'</td></tr>';
            }
            $("#getrewardrecord").html(html);
            var pagelist="";
            if(pno-3>0){
                pagelist+='<li><a href="'+parseInt(pno-3)+'">'+parseInt(pno-3)+'</a></li>';
            }
            if(pno-2>0){
                pagelist+='<li><a href="'+parseInt(pno-2)+'">'+parseInt(pno-2)+'</a></li>';
            }
            if(pno-1>0){
                pagelist+='<li><a href="'+parseInt(pno-1)+'">'+parseInt(pno-1)+'</a></li>';
            }
            pagelist+='<li><a href="'+pno+'" class="active">'+ pno+'</a></li>';
            if(pno+1<=pagetotle){
                pagelist+='<li><a href="'+parseInt(pno+1)+'">'+parseInt(pno+1)+'</a></li>';
            }
            if(pno+2<=pagetotle){
                pagelist+='<li><a href="'+parseInt(pno+2)+'">'+parseInt(pno+2)+'</a></li>';
            }
            if(pno+3<=pagetotle){
                pagelist+='<li><a href="'+parseInt(pno+3)+'">'+parseInt(pno+3)+'</a></li>';
            }
            if(pno!=0)
                $("#list").html(pagelist);
        }
    })
}