const router = require('express').Router();

/**
 * @api {get} /api/user/ returns all users
 * @apiName get all users
 * @apiGroup user
 * @apiPermission User
 * @apiSuccess {Object}   user                              user object
 * @apiSuccess {String}   user.username                     username
 */
router.get("/", (req, res, next) => {
    const db = req.db;
    db.User.findAll({
        attributes: ['username'],
    }).then(function (users) {
        res.send(users);
    });
});

/**
 * @api {get} /api/user/:username returns user details
 * @apiName returns user details
 * @apiGroup user
 * @apiPermission User
 * @apiSuccess {Object}   user                              user object
 * @apiSuccess {String}   user.username                     username
 * @apiSuccess {String}   user.email                        email
 * @apiSuccess {String}   user.bio                          biography text
 */
router.get("/:username/", (req, res, next) => {
    const db = req.db;
    db.User.findOne({
        attributes: ['username', 'bio'],
        where: { username: req.params.username }
    }).then(function (user) {
        res.send(user);
    });
});

module.exports = {router};