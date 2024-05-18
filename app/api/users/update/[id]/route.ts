import connectToDatabase from '@/lib/database';
import User from '@/lib/database/models/user.model';
import { NextRequest, NextResponse } from 'next/server';
import jwt from "jsonwebtoken";


connectToDatabase();

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        // update the user
        const user = await User.findByIdAndUpdate(params.id, await req.json(), {
            new: true,
            runValidators: true,
        })
        // if update fails return
        if (!user) return NextResponse.json({ success: false }, { status: 400 });
        // chceck if there is AUTH_SECRET key in environment variables
        const AUTH_SECRET = process.env.AUTH_SECRET;
        if (!AUTH_SECRET) throw new Error('Please set the AUTH_SECRET environment variable');
        // create a new token
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
            locale: user.locale,
            imageUrl: user.imageUrl,
        };
        const token = jwt.sign(tokenData, AUTH_SECRET, { expiresIn: '1d' });
        // create a success response
        const res = NextResponse.json({ success: true, data: { locale: user.locale } }, { status: 201 });
        // set the jwt token to the response
        res.cookies.set('auth-kanban', token, { httpOnly: true });
        // send the response with the token
        return res;
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
