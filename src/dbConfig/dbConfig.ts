import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        
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
}