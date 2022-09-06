const express = require('express')
const router = express.Router()
const exercisesController = require('../controllers/exercises') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, exercisesController.getTodos)

router.post('/createTodo', exercisesController.createTodo)

router.put('/markComplete', exercisesController.markComplete)

router.put('/markIncomplete', exercisesController.markIncomplete)

router.delete('/deleteTodo', exercisesController.deleteTodo)

module.exports = router






// router.get('/', ensureAuth, todosController.getTodos)

// router.post('/createTodo', todosController.createTodo)

// router.put('/markComplete', todosController.markComplete)

// router.put('/markIncomplete', todosController.markIncomplete)

// router.delete('/deleteTodo', todosController.deleteTodo)