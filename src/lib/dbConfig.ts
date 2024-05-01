import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
}

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI || "", {})
        connection.isConnected = db.connections[0].readyState
        //Assignment to console the db.connection and connection.isConnected 
        console.log("Connected to database successfully")
    } catch (error) {
        console.log("Error connecting to database", error)
        process.exit(1)
    }
}

export default dbConnect;