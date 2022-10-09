const express = require('express')
const router = express.Router()
const upload = require("../middleware/multer");
const exerciseController = require('../controllers/exercise') 
const { ensureAuth } = require('../middleware/auth')

router.get('/:id', ensureAuth, exerciseController.getExercise)

// router.get('/editExercise/:id', exerciseController.editExercise)

router.post('/createExercise', upload.single("file"), exerciseController.createExercise)

router.put('/editExercise/:id', exerciseController.editExercise)

router.delete('/deleteExercise/:id', exerciseController.deleteExercise)

module.exports = router
