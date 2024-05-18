import connectToDatabase from '@/lib/database';
import { getTokenData } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';


connectToDatabase();

export const GET = async (req: NextRequest) => {
    try {
        // extract token data
        const tokenData = getTokenData(req);
        // create response data
        const resultData = {
            id: tokenData.id,
            username: tokenData.username,
            email: tokenData.email,
            locale: tokenData.locale,
            imageUrl: tokenData.imageUrl,
        };
        return NextResponse.json({ success: true, data: resultData }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
