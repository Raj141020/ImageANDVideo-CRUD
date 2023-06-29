const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect('mongodb+srv://Rajnagwanshi:abhishek1410@cluster0.qlrpwrw.mongodb.net/STUDENT__DATA', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB'); 
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error); 
  });


  app.use(express.json());

  app.use("/useimage", require("./routes/user.js"));
  
  app.use("/uservideo", require("./routes/user1.js")); 

  app.listen(5000, () => console.log("Server is running"));    




