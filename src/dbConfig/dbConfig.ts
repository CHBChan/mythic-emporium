import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URI!);

const dbConnection = mongoose.connection;

dbConnection.on('connected', () => {
    console.log('Connected to MongoDB');
})

dbConnection.on('error', (err) => {
    console.log('MongoDB did not connect: ' + err);
    process.exit();
});

export { dbConnection };