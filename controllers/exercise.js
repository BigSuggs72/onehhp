const Exercise = require('../models/Exercise')

module.exports = {
    getExercise: async (req,res)=>{
        console.log(req.user)
        try{
            const exerciseItems = await Exercise.find({userId:req.user.id})
            // const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            res.render('exercise.ejs', {exercise: exerciseItems, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createExercise: async (req, res)=>{
        try{
            await Exercise.create({exercise: req.body.exerciseItem, userId: req.user.id})
            console.log('Exercise has been added!')
            res.redirect('/exercise')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Exercise.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Exercise.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteExercise: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Exercise.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    