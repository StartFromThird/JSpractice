# Koa2.0  
## 用 Koa mock 数据  
1. dependencies: koa-route, koa-body, fs.promised  
2. 文件结构：   
    app.js  
    service--webAppService.js  
    mock-----a.json + b.json  
3. 最简单的情况  
webAppService.js 暴露一个方法AAA, AAA实现读取对应位置json文件并返回。  
```javascript   
var fs = require('fs');  
exports.get_index_data = function(){
    var content = fs.readFileSync('./mock/home/bottomnav.json','utf-8');
    return content;
}
```  

app.js 设置路由，并调用AAA  
```javascript
var koa = require('koa');
var route = require('koa-route');
var app = new koa();
var service = require('./service/webAppService');

var get_home_json = function(ctx) {
    ctx.response.body = service.get_index_data();    
}
app.use(route.get('/ajax/index', get_home_json));  

```    
4. 需要get参数的情况  
webAppService.js  
```javascript  
exports.get_goods_data = function(id){
    if(!id){
        id = "180817";
    }
    if(fs.existsSync('./mock/goods/' + id + '.json')){
        return fs.readFileSync('./mock/goods/' + id + '.json', 'utf-8');
    }else{
        return fs.readFileSync('./mock/goods/180807.json', 'utf-8');
    }
    return content;
}  
```  
app.js  
```javascript
var querystring = require('querystring');
var get_goods_json = function(ctx) {
    // 地址参数 → 对象
    var params = querystring.parse(ctx.req._parsedUrl.query);
    var id = params.id;
    if(!id){
        id = "";
    }
    ctx.body = service.get_goods_data(id);
} 
app.use(route.get('/ajax/goods', get_goods_json));
``` 
  
## 用 Koa 做服务 
1. dependencies: koa-route, koa-static, koa-static-server, co-views, ejs    
2. 文件结构  
    app.js  
    static--js--common.js  
    view----goodsDetail.html 
3. 实现   
app.js  
```javascript
// 静态资源文件
// http://127.0.0.1:3001/js/common.js

var path = require('path');
var serve = require('koa-static');
var staticPath = './static'
var main = serve(path.join( __dirname,  staticPath));
app.use(main);

// 页面
// http://127.0.0.1:3001/goodsDetail?id=180807

var views = require('co-views')
var render = views('./view', {
  map: { html: 'ejs' }
});
var koa_static = require('koa-static-server');
app.use(route.get('/goodsDetail', async function(ctx, next){
    ctx.set('Cache-Control', 'no-cache');
    var params = querystring.parse(ctx.req._parsedUrl.query);
    var goodsId = params.id;
    ctx.body = await render('goodsDetail', {goodsId:goodsId});
}));
```

有用资料：  
阮一峰koa教程 <http://www.ruanyifeng.com/blog/2017/08/koa.html>  
踩坑koa1.x升级koa2.x <https://div.io/topic/1937>  
node path模块 <http://nodejs.cn/api/path.html#path_path>