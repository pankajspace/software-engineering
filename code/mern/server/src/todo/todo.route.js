const express = require('express');
const router = express.Router();
const TodoController = require('./todo.controller');

router.get('/insertall', TodoController.insertAll);
router.get('/getall', TodoController.getAll);
router.post('/add', TodoController.add);
router.post('/update', TodoController.update);
router.delete('/delete/:id', TodoController.remove);

module.exports = router;


