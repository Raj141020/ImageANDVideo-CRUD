const router = require("express").Router();
const cloudinary = require("../lib/cloudinary");
const upload = require("../utils/multer2");
const User = require("../model/model1");

router.post("/", upload.single("video"), async (req, res) => {
  try {
    // Upload video to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path,
        {
            resource_type: "video",
            folder: "video",
          },
        
       );

    // Create new user
    let user = new User({
      name: req.body.name,   
      avatar: result.secure_url,
      cloudinary_id: result.public_id,   
    });
    // Save user 
    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    let user = await User.find();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Find user by id
    let user = await User.findById(req.params.id);
    // Delete video from cloudinary
    await cloudinary.uploader.destroy(user.cloudinary_id); 
    // Delete user from db
    await user.deleteOne(); 
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", upload.single("video"), async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    // Delete video from cloudinary
    await cloudinary.uploader.destroy(user.cloudinary_id);
    // Upload video to cloudinary
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    const data = {
      name: req.body.name || user.name,
      avatar: result?.secure_url || user.avatar,
      cloudinary_id: result?.public_id || user.cloudinary_id,
    };
    user = await User.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // Find user by id
    let user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;