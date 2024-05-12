import connectToDatabase from '@/lib/database';
import User from '@/lib/database/models/user.model';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';


connectToDatabase();

export const POST = async (req: NextRequest) => {
    try {
        // extract data from the request
        const { username, email, password, locale } = await req.json();
        // check if user with given username or email already exists
        const user = await User.findOne({ $or: [{ username: username }, { email: email }] });
        if (user) return NextResponse.json({ success: false }, { status: 400 });
        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // save user to the database
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
            locale: locale,
        });
        const savedUser = await newUser.save();
        return NextResponse.json({ success: true, data: {
            _id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            locale: savedUser.locale,
            imageUrl: savedUser.imageUrl,
        } }, { status: 201 });  
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
