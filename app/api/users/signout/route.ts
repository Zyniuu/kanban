import connectToDatabase from '@/lib/database';
import { NextRequest, NextResponse } from 'next/server';


connectToDatabase();

export const GET = async (req: NextRequest) => {
    try {
        // create a success response
        const res = NextResponse.json({ success: true }, { status: 201 });
        // set an expired cookie
        res.cookies.set('auth-kanban', '', { httpOnly: true, expires: new Date(0) });
        // send the response
        return res;
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
