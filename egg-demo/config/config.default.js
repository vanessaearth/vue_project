/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    view: {
      defaultViewEngine: 'nunjucks',
      mapping: { '.tpl': 'nunjucks' },
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1587439985558_1086';

  // add your middleware config here
  config.middleware = ['errorHandler'];

  config.mongoose = {
    url: 'mongodb://0.0.0.0:27017/egg_x',
    options: {
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
    },
  };

  // add your user config here
  const userConfig = {

    // myAppName: 'egg',
    swaggerdoc: {
      dirScanner: './app/controller',
      apiInfo: {
        title: '接口文档',
        description: 'api接口文档',
        version: '1.0',
      },
      schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json'],
      enableSecurity: false,
      routerMap: true,
      enable: true,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
