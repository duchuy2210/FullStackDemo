//Model 
//B1- install mongoose
//B2- Connect DB
//B3- Create model

//B2
//connect db
const mongoose = require('mongoose');

async function connect(){
    try{
        await mongoose.connect('mongodb://localhost:27017/Game_dev');
        console.log('Connect Success')
    }catch(error){
        console.log('Connect failed')
    }
}

module.exports = {connect};//exports object