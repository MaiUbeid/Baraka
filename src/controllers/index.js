const router = require('express').Router();
const { client, server } = require('./error');
const home = require('./home');

router.get('/', home);

router.all('*', client);
router.use(server);

module.exports = router;