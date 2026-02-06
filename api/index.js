const { bootstrap } = require('../dist/bootstrap');

let app;

module.exports = async (req, res) => {
  if (!app) {
    app = await bootstrap();
    await app.init();
  }

  const instance = app.getHttpAdapter().getInstance();
  return instance(req, res);
};
