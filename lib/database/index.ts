import mongoose from "mongoose";


declare global {
    var mongoose: any;
};

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable.'
    );
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectToDatabase = async () => {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        const options = {
            dbName: 'kanban',
            bufferCommands: false,
        }
        cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
            return mongoose;
        });
    }
    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw error;
    }
    return cached.conn;
}

export default connectToDatabase;