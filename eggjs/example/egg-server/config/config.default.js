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
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1627298527948_1305';

  // add your middleware config here
  config.middleware = ['errorHandler'];

  config.swaggerdoc = {
    dirScanner: './app/controller', // 扫描的文件夹
    apiInfo: {
      title: '开课吧接⼝',
      description: '开课吧接⼝ swagger-ui for egg',
      version: '1.0.0'
    },
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    enableSecurity: false,
    // enableValidate: true, // 有点小问题
    routerMap: true, // 自动产生路由映射
    enable: true
  };

  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/egg_x',
    options: {
      // useMongoClient: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
    }
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
