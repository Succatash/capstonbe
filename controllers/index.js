const router = require('express').Router();
const {authPlaceholder, permissionChekcer} = require('../middleware');

router.use('/users', require('./user'));
// router.use('/students', require('./students'));

// 404 Handling
// router.use((req, res, next) => {
// 	const error = new Error('404 Not Found');
// 	error.status = 404;
// 	next(error);
// });

module.exports = router;
