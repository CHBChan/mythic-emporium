import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const MongoConnect = async() => {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('Connected to MongoDB');
        })

        connection.on('error', (err) => {
            console.log('MongoDB did not connect: ' + err);
            process.exit();
        });
    }
    catch(error) {
        console.log('Error');
        console.log(error);
    }
};

export { MongoConnect }