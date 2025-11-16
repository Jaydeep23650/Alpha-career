import mongoose from "mongoose";

const connectionString = process.env.MONGODB_URI || "mongodb+srv://jaydeepjnvmzp2002_db_user:hESNwTIRBwzYlQag@cluster0.0by1msm.mongodb.net/job_portal?retryWrites=true&w=majority&appName=Cluster0";
// const connectionString =  "mongodb://localhost:27017/job_portal";
const dbConnection = async () => {
    try {
        // Check if already connected
        if (mongoose.connection.readyState === 1) {
            console.log("MongoDB already connected");
            return;
        }

        // Connection options for better reliability
        const options = {
            serverSelectionTimeoutMS: 30000, // 30 seconds
            socketTimeoutMS: 45000, // 45 seconds
            connectTimeoutMS: 30000, // 30 seconds
            maxPoolSize: 10,
            retryWrites: true,
        };

        await mongoose.connect(connectionString, options);
        console.log("Connected to MongoDB successfully");

        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('MongoDB disconnected');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB reconnected');
        });

    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        throw error;
    }
}

export default dbConnection;