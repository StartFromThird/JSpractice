//common JS
var $ = function(selector) {
    return document.querySelector(selector)
};
var ajax = function(method, path, headers, data, reseponseCallback) {
    var r = new XMLHttpRequest()
    // 设置请求方法和请求地址
    r.open(method, path, true)
    // 设置发送的数据的格式 客户端提交给服务器文本内容的编码方式 
    for (i in headers){
        r.setRequestHeader(i, headers[i])
    }      
    // 注册响应函数
    r.onreadystatechange = function() {
        // console.log("r.readyState", r.readyState)
        if(r.readyState === 4) {
            reseponseCallback(r.response)
        }else{
            console.log(r.readyState, "error")
        }
    }
    // 发送请求
    r.send(data)
};

// ajax参数
// 获取quoteObj
// 插入quoteObj 文本内容&作者
// getQuote绑定事件
var getQuoteButton = $('#getQuoteButton');
var quoteContent = $('.quoteContent');
var shareButton = $('#shareButton');
var quoteString = "";
var getQuote = function(){
    const headers = {
      "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    }
    const url = "https://andruxnet-random-famous-quotes.p.mashape.com?cat=movies";
    ajax('GET', 
        url,
        headers,
        '',
        function(res) {
            var res = JSON.parse(res);
            var quoteTxt = res[0].quote;
            var quoteAuthor = res[0].author;
            var quoteHtml = `
                <div>${quoteTxt}</div>
                <p>from <span>${quoteAuthor}</span></p>
            `;
            quoteContent.innerHTML = quoteHtml;
            quoteString = `"${quoteTxt}" from ${quoteAuthor}`
        }
    );
};
getQuote();
getQuoteButton.addEventListener("click", getQuote)
// 设置分享内容
// shareQuote绑定事件
var shareQuote = function(str){
        var wb_base_url = "http://service.weibo.com/share/share.php?url=";
        var wb_url = document.URL;
        var wb_title = str + wb_url.toString();
        var wb_ralateUid = "";
        var wb_pic = "";
        var wb_language = "en-us";
        var share_url = `${wb_base_url}&title=${wb_title}&pic=${wb_pic}&ralateUid=${wb_ralateUid}&language=${wb_language} `;
        window.open(share_url, "", "width=800, height=600")
}
shareButton.addEventListener("click", function(){
    shareQuote(quoteString);
});
