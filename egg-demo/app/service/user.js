const Service = reuqire('egg').Service;
// async list(page = 1){
//   const { serverUrl, pageSize } = this.config.news
//   const { data: idList } = await this.ctx.curl(`${serverUrl}/topstories.json`, {
//     data: {
//       orderBy: '"$key"',
//       startAt: `"${pageSize * (page - 1)}"`,
//       endAt: `"${pageSize * page - 1}"`,
//     },
//     dataType: 'json'
//   });
//   const userList = await Promise.all(
//     Object.keys(idList).map(key => {
//       const url = `${serverUrl}/item/${idList[key]}.json`;
//       return this.ctx.curl(url, { dataType: 'json' })
//     })
//   )
//   return userList.map(res => res.data)
// }
class UserService extends Service {
  /**
   * 创建用户
   * @param {*} payload
   * @description 创建用户
   */
  async create (payload) {
    const { ctx } = this;
    payload.password = await this.ctx.genHash(payload.password);
    return ctx.model.Use.create(payload);
  }
}
module.exports = UserService;
