var shareQuote = function(){
         var wb_shareBtn = document.getElementById("shareBtn")
        //获取当前页面地址
        wb_url = document.URL, 
        wb_appkey = "",
        wb_title = "【蓝色梦想 BluesDream.com】自定义新浪微博分享按钮样式",
        wb_ralateUid = "1654619591",
        wb_pic = "",
        wb_language = "zh_cn";

        wb_shareBtn.setAttribute("href","http://service.weibo.com/share/share.php?url="+wb_url+"&appkey="+wb_appkey+"&title="+wb_title+"&pic="+wb_pic+"&ralateUid="+wb_ralateUid+"&language="+wb_language+"");
}
