$.fn.extend({ProgressBarWars: function(opciones) {
					var ProgressBarWars=this;
					var theidProgressBarWars=$(ProgressBarWars).attr("id");
					var styleUnique = Date.now();
                    var StringStyle="";
					
					defaults = {
					porcentaje:"100",
					tiempo:1000,
					color:"",
					estilo:"yoda",
					tamanio:"30%",
					alto:"6px"
					}
					
					var opciones = $.extend({}, defaults, opciones);
					if(opciones.color!=''){StringStyle="<style>.color"+styleUnique+"{display: block; width: 0%; background-color: #6c98d4;}</style>";opciones.estilo="color"+styleUnique;}
					$(ProgressBarWars).before(StringStyle);
					$(ProgressBarWars).append('<span class="barControl" style="width:'+opciones.tamanio+';"><div class="barContro_space"><span class="'+opciones.estilo+'" style="height: '+opciones.alto+';"  id="bar'+theidProgressBarWars+'"></span></div></span>');
					$("#bar"+theidProgressBarWars).animate({width: opciones.porcentaje+"%"},opciones.tiempo);
					this.mover = function(ntamanio) {
					$("#bar"+$(this).attr("id")).animate({width:ntamanio+"%"},opciones.tiempo);
					};
	return this;			 
	}
});

//新添加

//引用
var proQuote = null;

//上传图片函数
function uploadImg(file,type,id){
	//上传图片
	var formData = new FormData();
	formData.append("file",file);
	formData.append("type",type);
	formData.append("id",id);
	var url = null;
	//ajax
	$.ajax({
		type:"POST",
		dataType:"JSON",
		url:website + 'mImg/uploadImg.do',
		data:formData,
		processData: false,
		contentType: false,
		beforeSend: function () {
			if(proQuote == null){
				$(".progressbox").css("display","block");
				proQuote = $("#prog").ProgressBarWars({porcentaje:0,color:"#6c98d4",tiempo:100});
			}else{
				proQuote.mover(0);
			}
		},
		xhr: function(){
			//获取ajaxSettings中的xhr对象，为它的upload属性绑定progress事件的处理函数
			myXhr = $.ajaxSettings.xhr();
			if(myXhr.upload){ //检查upload属性是否存在
				//绑定progress事件的回调函数
				myXhr.upload.addEventListener('progress',progressHandlingFunction, false);
			}
			return myXhr; //xhr对象返回给jQuery使用
		},
		success: function (result) {
			if (result) {
				if(result.success){
					layer.msg("成功");
					$(".upload_box").css("border","none");
					$(".upload_char span").hide();
					url = result.data.url;
					$("#imgbox").prop('src',url).show();
					$("#floor_bg").prop('src',url).show();
					$("#prog").hide();
				}else{
					layer.msg("失败");
				}
			}

		},
		complete: function () {
		},
		error: function (e) {
      console.log(e);
			layer.msg("上传失败");
		}
	})

}

//上传进度回调函数
function progressHandlingFunction(e) {
	if (e.lengthComputable) {
		var percent = e.loaded / e.total * 100;
		proQuote.mover(percent);
		// $("#progtext").html(e.loaded + "/" +  e.total);
	}
}

//上传图片函数
function uploadLocalImg(file,type,id){
	//上传图片
	var formData = new FormData();
	formData.append("file",file);
	formData.append("type",type);
	formData.append("id",id);
	var url = null;
	//ajax
	$.ajax({
		type:"POST",
		dataType:"JSON",
		url:website + 'mImg/uploadLocalImg.do',
		data:formData,
		processData: false,
		contentType: false,
		beforeSend: function () {
			if(proQuote == null){
				$(".progressbox").css("display","block");
				proQuote = $("#prog").ProgressBarWars({porcentaje:0,color:"#6c98d4",tiempo:100});
			}else{
				proQuote.mover(0);
			}
		},
		xhr: function(){
			//获取ajaxSettings中的xhr对象，为它的upload属性绑定progress事件的处理函数
			myXhr = $.ajaxSettings.xhr();
			if(myXhr.upload){ //检查upload属性是否存在
				//绑定progress事件的回调函数
				myXhr.upload.addEventListener('progress',progressHandlingFunction, false);
			}
			return myXhr; //xhr对象返回给jQuery使用
		},
		success: function (result) {
			if (result) {
				if(result.success){
					layer.msg("成功");
					url = result.data.url;
					$("#floor_bg").prop('src',url).show();
					
					filename = result.data.filename;
				}else{
					layer.msg("失败");
				}
				$("#prog").hide();
			}

		},
		complete: function () {
		},
		error: function (e) {
      console.log(e);
			layer.msg("上传失败");
		}
	})
}
