const express = require('express');
const router = express.Router();

const User = require('./User');

const db = require('../knex');

// inject db to req
router.use((req,res,next) => {
    req.db = db;
    next();
});


router.use("/user", User.router);

// return the router
module.exports = {router};