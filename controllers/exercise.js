const cloudinary = require("../middleware/cloudinary");
const Exercise = require('../models/Exercise')

module.exports = {
    getProfile: async (req, res) => {
    try {
      const exercises = await Exercise.find({ user: req.user.id });
      res.render("profile.ejs", { exercises: exercises, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
    getCatalog: async (req, res) => {
     try {
      const exercises = await Exercise.find().sort({ createdAt: "desc" }).lean();
      res.render("catalog.ejs", { exercises: exercises });
    } catch (err) {
      console.log(err);
    }
  },
    getExercise: async (req,res)=>{
        console.log(req.user)
        try{
            const exerciseItem = await Exercise.findById(req.params.id);
            // const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            res.render('exercise.ejs', {exercise: exerciseItem, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createExercise: async (req, res) => {
        try {
            // Upload image to cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);

        await Exercise.create({
                                name: req.body.name,
                                image: result.secure_url,
                                cloudinaryId: result.public_id,
                                user: req.user.id
                              });
                                
            console.log("Exercise has been added!");
            res.redirect("/profile");
            } catch (err) {
            console.log(err);
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