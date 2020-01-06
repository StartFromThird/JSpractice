const Controller = require('egg').Controller;
const moment = require('moment')
class ArticleController extends Controller {
  async create() {
    const { ctx } = this;
    const params = {
      ...ctx.request.body,
      createTime: moment().format('YYYY-MM-DD HH:mm:ss')
    }
    const result = await ctx.service.article.create(params)
    if (result) {
      ctx.body = {
        code: 200,
        data: result,
      }
    } else {
      ctx.body = {
        code: 500,
        errMsg: '新增失败'
      };
    }
    // product/create
  }
  async lists() {
    const {ctx} = this;
    const result = await ctx.service.article.lists()
    if (result) {
      ctx.body = {
        code: 200,
        data: result
      }
    } else {
      ctx.body = {
        code: 500,
        errMsg: '获取列表数据失败'
      };
    }
  }
  async detail() {
    const {ctx} = this;
    console.log("XXX", ctx.query, ctx.params)
    const result = await ctx.service.article.detail(ctx.params.id)
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
