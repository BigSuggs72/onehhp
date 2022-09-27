const express = require('express')
const router = express.Router()
const upload = require("../middleware/multer");
const exerciseController = require('../controllers/exercise') 
const { ensureAuth } = require('../middleware/auth')

router.get('/:id', ensureAuth, exerciseController.getExercise)

router.post('/createExercise', upload.single("file"), exerciseController.createExercise)

router.delete('/deleteExercise', exerciseController.deleteExercise)

module.exports = router
