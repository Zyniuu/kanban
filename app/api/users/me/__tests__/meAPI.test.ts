import { getTokenData } from "@/lib/utils";
import { GET } from "../route";
import { NextRequest, NextResponse } from "next/server";


// Mocking the database connection
jest.mock('../../../../../lib/database/index', () => ({
    __esModule: true,
    default: jest.fn().mockResolvedValue({}),
}));

jest.mock('../../../../../lib/utils', () => ({
    _esModule: true,
    getTokenData: jest.fn(),
}));

describe('api/users/me', () => {
    it('should return a JSON response with status 201 and user data when given valid token', async () => {
        const req = {};
        const tokenData = {
            id: '123',
            username: 'testuser',
            email: 'testuser@example.com',
            locale: 'en',
            imageUrl: '/images/user.png',
        };
        jest.mocked(getTokenData).mockReturnValue(tokenData);
        NextResponse.json = jest.fn().mockImplementation((elem) => (elem));
        
        const res = await GET(req as unknown as NextRequest);

        expect(res).toEqual(NextResponse.json({ success: true, data: tokenData }, { status: 201 }));
    });

    it('should return a JSON response with status 500 when token is invalid', async () => {
        const req = {};
        jest.mocked(getTokenData).mockImplementation(() => {
            throw new Error('Test Error');
        });
        NextResponse.json = jest.fn().mockImplementation((elem) => (elem));
        
        const res = await GET(req as unknown as NextRequest);

        expect(res).toEqual(NextResponse.json({ success: false }, { status: 500 }));
    });
});
