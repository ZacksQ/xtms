$(function(){
    searchName();
})
//<button style="width:100px;height:50px;background:#7dafe0;position:absolute;">上传图片<input type="file" style="border:0;position:absolute;z-index:-1；" id="file" onchange="addpic()"></button>
$("#add").click(function(){
    layui.use(['layer'], function(){
        layer.open({
            title: '输入频道名称'
            ,area:['500px','']
            ,content: '<h3 style="color:#5485c4">上传频道标签</h3><div style="width:500px;height:150px;margin:10px auto;"><h3 id="show" style="width:136px;height:136px;background:#ddd url(images/upload.png) no-repeat 50% 50%;float:left;position: relative;"><input id="file" type="file" style="height: 100%;width:136px;display: block;cursor: pointer; opacity:0;position: absolute;top:0px;" onchange="addpic()"><label for="file" id="filea" style="height:136px;width:136px;display: block;cursor: pointer; opacity:0;color:white;text-align: center;line-height: 136px;font-size: 14px;">更改图片</label></h3><h3 style="width:55%;height:136px;float:left;">'+
            // '<p style="width:128px;height:128px;background:#7dafe0;margin-top:20px;margin-left:10px">'+
            // '<img src="" alt="" id="show" style="width:100%;height:100%;"/></p>'+
                '<p><ul style="color:#7dafe0;margin-top:0px;margin-left:20px"><span style="color:#f00">*</span><li style="color:#5485c4;margin-left:3px;display: inline-block;">图片大小为2M以内支持PNG,JPG,JPEG格式</li><br><span style="color:#f00">*</span><li style="color:#5485c4;margin-left:3px;display: inline-block;">您上传的图片会自动生成54*54像素的图片</li><li style="color:#ccc;margin-left:8px">请注意图片是否清晰</li></ul></p></h3></div><div style="color:#5485c4;">输入频道名称:</div><input type="text" id="pName" placeholder="输入名称" style="border:1px solid #ccc;outline:none;border-radius:10px;-webkit-border-radius:10px;-o-border-radius:10px;-moz-border-radius:10px;width:300px;padding-left:10px;margin-left:0px;margin-top:16px;width:350px;height:36px;" value=""><br><p style="color:#f00;margin-top:20px;margin-bottom:10px;" >直播说明</p><p style="color:#ccc;">象塔直播严禁上传包括反动、暴力色情、违法、侵权等内容的文件，平台有义务配合有关部门将上传违规文件的用户信息保存，并保留因配合调查及冻结账号的权利。</p><div style="color:#ccc;margin-top:10px;"><input name="checkbox" type="checkbox" value="checkbox" checked style="-webkit-appearance: checkbox;" id="mecheckbox"/>我已阅读直播说明</div>'
        ,closeBtn:0
            ,btn: ['确定','取消']
            ,yes: function(index,layero){
            layer.close(index);
            var name=$("#pName").val();
            if(name!=''){
            	if ($("#mecheckbox").is(":checked")){
            		addName(name);
            	}
                else{
                	layer.msg("请阅读直播说明并勾选");
                }
            }else{
                layer.msg("请输入频道名称");
            }
        }
    });
});
})

function addName(name){
    var logourl=window.sessionStorage.getItem("url");
    var url="http://www.xiangtazhibo.com/newlive/mlive/createChannel.do";
    layui.use(['layer'], function(){
        $.ajax({
            url:url,
            type:"post",
            dataType:"json",
            data:{"channelname":name,"logourl":logourl},
            success:function(data){
                if(data.success){
                    layer.msg("创建成功");
                    window.sessionStorage.removeItem("url");
                    searchName();
                }else{
                    layer.msg("创建失败");
                }
            }
        });
    });
}
function searchName(){
    var url="http://www.xiangtazhibo.com/newlive/mivechannel/getUserLiveChannel.do";
    $.ajax({
        url:url,
        type:"post",
        dataType:"json",
        success:function(data){
            console.log(data);
            var html='';
            for(var i=0;i<data.data.livechannelList.length;i++){
                var p=data.data.livechannelList[i];
                    html+='<li class="con2 media_left" data-liveid="'+p.id+'"><a href="monitor.html?liveid='+p.id+'" class="media_con"><img class="fl" src="'+ (p.logoimg==""?"images/icon.png":p.logoimg)+'" alt=""/><div class="media_right"><h3><b>'+p.channelname+'</b><span class="fr">'+p.createtime+'</span></h3><p><span>观看人次'+ p.viewernum+'<span>人</span></span></p></div></a><a href="javascript:;" onclick=\'dellive(\"'+p.id+'\")\' class="fr">删除</a></li>';
            }
            $("#pindao").html(html);
        }
    })
}
function addpic(){
    var url="http://www.xiangtazhibo.com/newlive/mImg/uploadImg.do";
    var formData = new FormData();
    formData.append('file', $('#file')[0].files[0]);
    formData.append('type', 5);
    $.ajax({
        url: url,
        type: 'post',
        cache: false,
        data: formData,
        processData: false,
        contentType: false
    }).done(function(data) {
    console.log(data.data.url);
        // $("#show").attr("src",data.data.url);
        $("#show").css({"background":"url("+data.data.url+") no-repeat","background-size":"100%"});
        window.sessionStorage.setItem("url",data.data.url);
        if($("#show").css({"background":"url("+data.data.url+") no-repeat","background-size":"100%"})){
		   console.log(data.data.url)
		   $("#show").hover(
									function(){
										$("#filea").css("background-color","black");
										$("#filea").css("opacity","0.3");	
	  				},function(){
										$("#filea").css("opacity","0");
	  				})
		}
    }).fail(function(res) {

    });
}