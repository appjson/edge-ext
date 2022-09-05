// 在插件中调用这个函数即可，这里使用的是加载页面直接调用方便测试
window.onload = function() {
	nCoV_news()
}
// 函数体
function nCoV_news(){
	// 获取页面元素并将信息添加入页面，将需要显示的
	let content = document.getElementById("content")
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var x = this.responseText;
			// 对获取到的数据json处理
			var obj = JSON.parse(this.responseText);
			// console.log(obj);
			// 将对指定内容添加入页面元素中
			// 其中0表示第一条新闻，如果需要更多新闻请使用循环体for(i = 0;i < obj['results'].length;i ++)，或者手动指定显示第几条新闻
			content.innerHTML="消息来源:<br />" + obj['results'][0]['infoSource'] + "<br />新闻标题:<br />" + obj['results'][0]['title'] + "<br />新闻内容:<br />" + obj['results'][0]['summary'];
		}
	};
	// 获取疫情新闻api的地址，以及传入特定参数例如page和num
	xhttp.open("GET", "https://lab.isaaclin.cn/nCoV/api/news?page=1&num=20", true);
	xhttp.send();
}
