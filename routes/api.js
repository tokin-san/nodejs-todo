var express = require('express');
var router = express.Router();

var user_controller = require('./../lib/controllers/user_controller');

router.get('/users', function(req, res, next) {
    const users = user_controller.index(req.query);
    res.json(users);
});

router.post('/users', function(req, res, next) {
    res.json(user_controller.store(req.body));
});

router.put('/users/:id', function(req, res, next) {
    res.json(user_controller.update(req.params.id, req.body))
});

router.delete('/users/:id', function(req, res, next) {
    res.json(user_controller.destroy(req.params.id));
});

router.delete('/users', function(req, res, next) {
    res.json(user_controller.destroy_all());
});

module.exports = router;
