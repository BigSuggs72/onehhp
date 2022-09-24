const express = require('express')
const router = express.Router()
const upload = require("../middleware/multer");
const exerciseController = require('../controllers/exercise') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, exerciseController.getExercise)

router.post('/createExercise', upload.single("file"), exerciseController.createExercise)

// router.put('/markComplete', exerciseController.markComplete)

// router.put('/markIncomplete', exerciseController.markIncomplete)

router.delete('/deleteExercise', exerciseController.deleteExercise)

module.exports = router