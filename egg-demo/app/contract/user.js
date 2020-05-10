module.exports = {
  createUserRequest: {
    mobile: { type: 'string', required: true, description: '手机号', example: '18010101010', format: /^1[3456789]\d{9}/ },
    password: { type: 'string', required: true, description: '密码', example: '111111' },
    username: { type: 'string', required: true, description: '用户名', example: 'tom' },
  },
};
