module.exports = (option, app) => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      app.emit('error:', err, this);
      const status = err.status || 500;
      const error = status === 500 && app.config.env === 'prod' ? 'internal Server Error' : err.message;
      ctx.body - {
        code: status,
        error,
      };
      if (status === 422) {
        ctx.body.detail = err.errors;
      }
      ctx.status = 200;
    }
  };
};
