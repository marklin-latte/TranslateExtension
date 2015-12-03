(function(){

document.addEventListener("dblclick",function(){
 var query = (document.selection && document.selection.createRange().text) ||
             (window.getSelection && window.getSelection().toString());
	var url = getUrlQuery(query);
	var deferred = getJson(url);
	deferred.then(function(data){
		var result =  JSON.parse(data);
		console.log(result);
	});
});

})();



var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=zh-TW&hl=zh-TW&dt=t&dt=bd&dj=1&source=icon&tk=509566|266802&q=";


function getUrlQuery(query){
	return url + query;
}

function getJson(url){
	return get(url,"json");
}

function get(url,type){
	return ajax({
		url:url,
		type:"GET",
		dataType:type
  });
}

function ajax(options){
	
	if(typeof options === 'undefined'){
		throw new TypeError('Options must be a object');
  }	

	var url = options.url || "",
		type = options.type || "GET",
		dataType = options.dataType || "json"
	
		return new Promise(function(resolve, reject){
		var xhr =  new XMLHttpRequest();
		xhr.open(
			type,
			url,
			typeof options.async === 'undefined' ? true : options.async
    );
		
		Object.keys(options.headers || {}).forEach(function(name) {
   	  xhr.setRequestHeader(name, options.headers[name]);
    });

		xhr.onreadystatechange = function(){
			if(this.readyState !== 4){
				return;
			}

			if(this.status === 200){
				resolve(xhr.response);
			}else{
				reject(xhr);
			}
		};

		xhr.send();

  });

}

