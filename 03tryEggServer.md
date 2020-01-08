# egg使用  [egg docs][egg] 
[egg]: https://eggjs.org
## 1. Router 路由配置 app/router

```javascript
module.exports = app => {
  const { router, controller } = app;
  // 路径, control方法
  router.post('/article/create', controller.article.create);
  router.get('/article/detail/:id', controller.article.detail);
};
```

## 2. Controller 业务逻辑 app/controller  
文件名小写，class 首字母大写
### Get 参数
- ?id=111  ctx.query  
- /id/111  ctx.params  
### Post 参数  
- ctx.request.body
### Delete 或 Update 参数
- ctx.params  
```javascript
const Controller = require('egg').Controller;

class ArticleController extends Controller {
  async detail() {
    const { ctx, app } = this;
    // 调用service方法
    const result = await ctx.service.article.detail
    if (result) {
      ctx.body = {
        code: 200,
        data: result
      }
    } else {
      ctx.body = {
        code: 500,
        errMsg: '获取详情失败'
      };
    }
  }
}

module.exports = ArticleController;
```

## 3. Service 业务逻辑封装层 app/service  
文件名小写，class 首字母大写
```javascript
const Service = require('egg').Service;
class ArticleService extends Service {
  async detail(id) {
    if (!id) {
      return null
    }
    const { app } = this;
    try{
      const result = await app.mysql.get('article', {id})
      return result
    }catch(err) {
      console.log(err)
      return null
    }
  }
}
module.exports = ArticleService;
```
## 4. Egg-mysql
### Create  
```javascript
插入一条记录 表名 插入参数
const result = await this.app.mysql.insert('article', { title: 'Hello World' });
```
### Read
```javascript
// 查全表  表名
const result = await this.app.mysql.select('article')
// 查询条件和结果定制
const results = await this.app.mysql.select('posts', { // 搜索 post 表
  where: { status: 'draft', author: ['author1', 'author2'] }, // WHERE 条件
  columns: ['author', 'title'], // 要查询的表字段
  orders: [['created_at','desc'], ['id','desc']], // 排序方式
  limit: 10, // 返回数据量
  offset: 0, // 数据偏移量
});
// 查一条记录  表名 查询参数
const result = await this.app.mysql.get('article', {id: 111});
```
### Delete
```javascript
// 删除一条记录
const result = await this.app.mysql.delete('posts', {id: 111});
```
### Update
```javascript
// 修改数据，默认根据 row 主键 ID 查找，并更新，没有 options 参数
// 如果主键是自定义的 ID 名称，如 custom_id，则需要在 `where` 里面配置
const row = {
  name: 'fengmk2',
  otherField: 'other field value',    // any other fields u want to update
  modifiedAt: this.app.mysql.literals.now, // `now()` on db server
};
const options = {
  where: {
    custom_id: 456
  }
};
// 更新  表名 新值 查询cusId
const result = await this.app.mysql.update('posts', row, options);

// 判断更新成功
const updateSuccess = result.affectedRows === 1;
```
## 5. 前台请求代理   
```javascript   
// vue.config.js
module.exports = {
  devServer: {
    // 检测到 /article 开头，请求接口代理 允许webService服务 开启虚拟服务器
    proxy: {
      '/article': {
        target: 'http://127.0.0.1:7001',
        ws: true,
        changeOrgin: true,
      }
    }
  }
}
```
## 6. config.default.js
### 安全风险相关关闭  
```javascript
  config.security = {
    csrf: {
      enable: false,
    },
  };
```