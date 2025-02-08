const mongoose = require("mongoose");

/* taskmanager is the cluster name */

/* mongodb+srv://tamilselvanmoorthi97:<db_password>@taskmanager.md0ug.mongodb.net/ */

 mongoose.connect(process.env.MONGODB_URL).then(()=> console.log('Mongoose connection is successfull')).catch((error)=> console.log(`Error is occured: ${error}`)); 
