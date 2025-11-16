import mongoose from "mongoose";
//  const connectionString = "mongodb+srv://jaydeepjnvmzp2002_db_user:hESNwTIRBwzYlQag@cluster0.0by1msm.mongodb.net/?appName=Cluster0"||"mongodb://localhost:27017/job_portal";

const connectionString = process.env.MONGODB_URI || "mongodb+srv://jaydeepjnvmzp2002_db_user:hESNwTIRBwzYlQag@cluster0.0by1msm.mongodb.net/?appName=Cluster0";
const dbConnection = async () => {
    try {
        await mongoose.connect(connectionString);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error); throw error;
    }
}

export default dbConnection;