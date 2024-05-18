import jwt from "jsonwebtoken";
import { getTokenData } from "../utils";
import { NextRequest } from "next/server";


describe('getTokenData util function', () => {
    it('should return a decoded token data', () => {
        // ARRANGE
        const req = {
            cookies: {
                get: jest.fn().mockReturnValue({ value: 'valid-token' }),
            }
        };
        process.env.AUTH_SECRET = 'secret';
        jwt.verify = jest.fn().mockReturnValue({ username: 'testuser' });

        // ACT
        const result = getTokenData(req as unknown as NextRequest);

        // ASSERT
        expect(result).toEqual({ username: 'testuser' });
        expect(req.cookies.get).toHaveBeenLastCalledWith('auth-kanban');
        expect(jwt.verify).toHaveBeenCalledWith('valid-token', 'secret');
    });
});