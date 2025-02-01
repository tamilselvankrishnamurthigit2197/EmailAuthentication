const mongoose = require("mongoose");

/* taskmanager is the cluster name */

/* mongodb+srv://tamilselvanmoorthi97:<db_password>@taskmanager.md0ug.mongodb.net/ */

 mongoose.connect('mongodb+srv://tamilselvanmoorthi97:tamilmongodbc2@cluster0.dxhby.mongodb.net/').then(()=> console.log('Mongoose connection is successfull')).catch((error)=> console.log(`Error is occured: ${error}`)); 
