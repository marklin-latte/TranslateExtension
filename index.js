
document.onmousemove = function(e){
	console.log(e.pageX);
	console.log(e.pageY);
}

var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=zh-TW&hl=zh-TW&dt=t&dt=bd&dj=1&source=icon&tk=509566|266802&q=";


function getUrlQuery(query){
	return url + query;
}

function getJson(url,callback){
	return get(url,data,callback,"json");
}

function get(url,callback,type){
	return ajax({
		url:url,
		type:"GET",
		dataType:type,
		success:callback
  });
}

function ajax(options){
	
	if(typeof === 'undefined'){
		throw new TypeError('Options must be a object');
  }	

	var url = options.url || "",
		type = options.type || "GET",
		dataType = options.dataType || "json",
		callback = options.success || function (){};
	
	return new Promise(function(resolve, reject){
		var xhr = new new XMLHttpRequest();
		xhr.open(
			type,
			url,
			typeof options.async === 'undefined' ? true : options.async,
    );
		
		Object.keys(options.headers || {}).forEach(function(name) {
   	  xhr.setRequestHeader(name, options.headers[name]);
    });

		xhr.onreadystatechange = function(){
			if(this.readystate !== 4){
				return;
			}

			if(this.status === 200){
				resolve(xhr);
			}else{
				reject(xhr);
			}
		};

		xhr.send();

  });

}

