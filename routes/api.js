var express = require('express');
var router = express.Router();

var user_controller = require('./../lib/controllers/user_controller');

router.get('/users', function(req, res, next) {
    const users = user_controller.index(req.query);
    res.json(users);
});

router.get('/users/:user_id/todos', function(req, res, next) {
	if(req.query.onlyopen == 1) {
		const users = user_controller.todo_filter(req.params.user_id, req.query.onlyopen);
		res.json(users);
	} else {
		const users2 = user_controller.todolist(req.params.user_id);
		res.json(users2);
	}
});

router.get('/users/:user_id/todos/:id', function(req, res, next) {
    const users = user_controller.todo_detail(req.params.id, req.params.user_id);
    res.json(users);
});

router.post('/users', function(req, res, next) {
    res.json(user_controller.store(req.body));
});

router.post('/users/:user_id/todos', function(req, res, next) {
    res.json(user_controller.storetodo(req.params.user_id, req.body));
});

router.put('/users/:id', function(req, res, next) {
    res.json(user_controller.update(req.params.id, req.body))
});

router.put('/users/:user_id/todos/:id', function(req, res, next) {
    res.json(user_controller.updatetodo(req.params.id, req.params.user_id, req.body))
});

router.delete('/users/:user_id/todos/:id', function(req, res, next) {
    res.json(user_controller.destroy_todo(req.params.id, req.params.user_id))
});

router.delete('/users/:id', function(req, res, next) {
    res.json(user_controller.destroy(req.params.id));
});

router.delete('/users', function(req, res, next) {
    res.json(user_controller.destroy_all());
});

module.exports = router;
