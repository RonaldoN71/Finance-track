const mongoose = require('mongoose');
require('dotenv').config();
    console.log("MONGO_URI:", process.env.MONGO_URI);
     mongoose.connect(process.env.MONGO_URI).then(()=> console.log("Database Connected")).catch((err)=>{console.log(err)});

