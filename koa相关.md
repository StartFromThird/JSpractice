# Koa2.0  
## 用 Koa mock 数据  
1. dependencies: koa-route, koa-body  
2. 文件结构：   
    app.js  
    service--webAppService.js  
    mock-----a.json + b.json  
3. app.js 写路由  
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
需要get参数的情况  
```javascript
var querystring = require('querystring');
var get_goods_json = function(ctx) {
    var params = querystring.parse(ctx.req._parsedUrl.query);
    var id = params.id;
    if(!id){
        id = "";
    }
    ctx.body = service.get_goods_data(id);
} 
app.use(route.get('/ajax/goods', get_goods_json));
```javascript