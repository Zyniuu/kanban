import mongoose from "mongoose";


export interface Users extends mongoose.Document {
    _id: string;
    username: string;
    email: string;
    password: string;
    locale: string;
    imageUrl?: string;
}

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true               },
    locale:   { type: String, required: true               },
    imageUrl: { type: String, default: '/images/user.png'  },
});

export default mongoose.models.User || mongoose.model<Users>('User', UserSchema);