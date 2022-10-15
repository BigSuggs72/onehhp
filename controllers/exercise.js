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
      res.render("catalog.ejs", { exercise: exercises, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
    getExercise: async (req,res)=>{
        try{
            const exercise = await Exercise.findById(req.params.id);
            // const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            res.render('exercise.ejs', {exercise: exercise, user: req.user})
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
                                notes: req.body.notes,
                                instructions: req.body.instructions,
                                user: req.user.id
                              });
                                
            console.log("Exercise has been added!");
            res.redirect("/profile");
            } catch (err) {
            console.log(err);
        }
    },

    editExercise: async (req, res) => {
          try {
              const result = await cloudinary.uploader.upload(req.file.path);

            await Exercise.findByIdAndUpdate(
              { _id: req.params.id }, 
              {
                $set: {  
                  name: req.body.name,
                  image: result.secure_url,
                  cloudinaryId: result.public_id,
                  notes: req.body.notes,
                  instructions: req.body.instructions,
                  user: req.user.id,
                }, 
              });
                                       
            console.log("Exercise has been updated!");
            res.redirect('/exercise');
            } catch (err) {
            console.log(err);
        }
    },
    
    updateExercise: async (req,res)=>{
        try{
            const exercise = await Exercise.findById(req.params.id);
            
            res.render('edit.ejs', {exercise: exercise, user: req.user})
        }catch(err){
            console.log(err)
        }
    },

    deleteExercise: async (req, res)=>{
      try {
        // Find post by id
        let exercise = await Exercise.findById({ _id: req.params.id });
        // Delete image from cloudinary
        await cloudinary.uploader.destroy(exercise.cloudinaryId);
        // Delete post from db
        await Exercise.remove({ _id: req.params.id });
        console.log("Deleted Post");
        res.redirect("/profile");
      } catch (err) {
        res.redirect("/profile");
      }
    },
}    