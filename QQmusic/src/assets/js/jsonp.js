
/**
 * [jsonP description]
 * @param  {string}   url          接口路径
 * @param  {string}   callbackName 回调函数的名字
 * @param  {Function} callback     [description]
 */
export default function jsonP(url,callbackName,callback){
	window[callbackName] = function(res){
		window[callbackName] = undefined;
        document.body.removeChild(script);
		callback(res);
	}
	
	var script = document.createElement("script");
	script.src = url;
	document.body.appendChild(script);
}