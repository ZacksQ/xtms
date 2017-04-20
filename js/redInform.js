var count=6;
var pageSize=parseInt(count);
$(function(){
    loadProduct(0);
})
$("#list").on("click","li",function(e){
    e.preventDefault()
    var page=parseInt($(this).find("a").attr("href"));
    var start=page*pageSize-pageSize;
    loadProduct(start);
})
function loadProduct(start){
    var url='http://www.xiangtazhibo.com/newlive/mMsg/getMsgList.do';
    $.ajax({
        url:url,
        type:'post',
        datatype:'json',
        data:{"startRecordNum":start,"perNumber":pageSize},
        success:function(data){
            //console.log("all"+data.totalCount);
            var pno= parseInt(data.currentPage);
            var pagetotle=parseInt(data.pageCount);
            var html='';
            for(var i=0;i<data.data.msgList.length;i++){
                var p=data.data.msgList[i];
                html+=
                    '<li id="'+ p.id+'"><a href="messagedetial.html?id='+ p["id"]+'">'+p.sendname+'<span class="fr">'+p.sendtimestr+'</span></a></li>'
                ;
            }
            
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
            if(data.totalCount>0){
                $("#msg-inform").html(html);
                $("#list").html(pagelist);
            }else{
                $("#msg-inform").text("暂无信息");
            }
                $("#num").text(data.totalCount);

        }
    })
}
//$("#msg-inform").on("click","li",function(){
//    var id=$(this).attr("id");
//    location.href="messagedetial.html?id="+id;
//})