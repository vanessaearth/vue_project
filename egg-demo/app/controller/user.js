/* eslint-disable strict */
const Controller = require('egg').Controller;
class UserController extends Controller {
  /**
   * @summary 创建用户
   * @description 创建用户，记录用户信息
   * @router post /api/user
   * @request body createUserRequest *body
   * @response 200 baseResponse 创建成功
   */
  async create () {
    const { ctx } = this;
    // ctx.validate(ctx.rule.createUserRequest);
    // this.ctx.body = 'user ctrl';
    const payload = ctx.request.body || {};
    // 调用service
    const res = await this.service.user.create(payload);
    ctx.helper.success({ ctx, res });
  }
  async index () {
    const res = {
      list: [
        { id: 1, name: 'tom', url: '/user/1' },
        { id: 2, name: 'jerry', url: '/user/2' },
      ],
    };
    // this.ctx.body = 'hi';
    await this.ctx.render('user/list.tpl', res);
  }
}
module.exports = UserController;
