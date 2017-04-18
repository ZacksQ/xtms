
$(function(){
    var url=location.search;
    var i=url.indexOf("=");
    var id=url.slice(i+1);
    var url='http://www.xiangtazhibo.com/newlive/mMsg/getMsgContent.do';
    $.ajax({
        url:url,
        type:'post',
        dataType:'json',
        data:{'msgid':id},
        success:function(data){
            var html='';
            html+='<p>'+data.data.content+'</p>';
            $("#cont").html(html);
        }
    })
})
