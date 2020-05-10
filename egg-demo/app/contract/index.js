module.exports = {
  baseRequest: {
    id: { type: 'string', description: 'id唯一键' },
  },
  baseResponse: {
    code: { type: 'integer', required: true, example: 0 },
    data: { type: 'string', example: '成功' },
    errMsg: { type: 'string', example: '请求失败' },
  },
};
