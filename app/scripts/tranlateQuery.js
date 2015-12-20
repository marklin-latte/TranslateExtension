/* @flow */
var LanguageDetect = require('languagedetect');
var lngDetector = new LanguageDetect();

var defaultLan = "en";
function getGoogleTranlateUrl(sf,query){
	return "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + sf + "&tl=zh-TW&hl=zh-TW&dt=t&dt=bd&dj=1&source=icon&tk=509566|266802&q=" + query;

} 


module.exports = {
	getUrl:function getUrl(query,queryText){
	  	lngDetector.languageType = "iso2";
			var lanResult = lngDetector.detect(queryText,1),
					targetLan = "";

			if(lanResult[0][1] < 0.1){
				targetLan = defaultLan;
			}else{
				targetLan = lanResult[0][0];
			}
			return encodeURI(getGoogleTranlateUrl(targetLan,query)); 
	},
	getParseResult:function getParseResult(data){
		var result = [],
				count = 0,
				tranlateTexts = [],
				dict;

		if(data.dict){
			dict = data.dict[0];
			tranlateTexts = data.dict[0].terms;
			count = tranlateTexts.length;
			for (var i=0 ;i < count ; i++){
				result.push(tranlateTexts[i])
			}
		}else if(data.sentences){
			dict = data.sentences;
			tranlateTexts = data.sentences;
			count = tranlateTexts.length;
			for (var i=0 ;i < count ; i++){
				result.push(tranlateTexts[i].trans);
			}
		}
		return result;
	}

}
