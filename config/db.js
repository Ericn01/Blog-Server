const mongoose = require('mongoose');

console.log(process.env.MONGO_URL);

const connectDB = async () => {
    try{
        const connect = await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log(`Server has succesfully connected to MongoDB: ${connect.connection.host}`);
    }   
    catch (err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;