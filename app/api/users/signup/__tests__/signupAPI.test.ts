import { POST } from "../route";
import User from '../../../../../lib/database/models/user.model';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";
// import httpMocks from 'node-mocks-http';


// Mocking the database connection
jest.mock('../../../../../lib/database/index', () => ({
    __esModule: true, // This line is important if using Babel
    default: jest.fn().mockResolvedValue({}),
}));

describe('api/users/signup', () => {
    const testData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        locale: 'en'
    };
    afterEach(() => {
        // Reset mocks before after test
        jest.clearAllMocks();
    });

    it('should create a new user if username and email are unique', async () => {
        // ARRANGE
        // Mocking the request
        const req = {
            json: jest.fn().mockResolvedValue(testData)
        };

        // Mocking User.findOne to simulate no existing user
        User.findOne = jest.fn().mockResolvedValue(null);

        // Mocking bcrypt.hash
        jest.spyOn(bcrypt, 'hash').mockImplementationOnce((elem) => ('hashedPassword'));

        // Mocking User.save
        const savedUser = {
            _id: '123456789',
            username: 'testuser',
            email: 'test@example.com',
            locale: 'en',
            imageUrl: '/images/user.png',
        };
        User.prototype.save = jest.fn().mockResolvedValue(savedUser);
        
        // mocking the `json` method of the `NextResponse` object.
        NextResponse.json = jest.fn().mockImplementation((elem) => (elem));

        // ACT
        const response = await POST(req as unknown as NextRequest);

        // ASSERT
        expect(User.findOne).toHaveBeenCalledWith({ $or: [{ username: 'testuser' }, { email: 'test@example.com' }] });
        expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
        expect(User.prototype.save).toHaveBeenCalled();
        expect(response).toEqual(NextResponse.json({ success: true, data: savedUser }, { status: 201 }));
    });

    it('should return a 500 error response when an error occurs', async () => {
        // ARRANGE
        // Mocking the request
        const req = {
            json: jest.fn().mockResolvedValue(testData)
        };
        req.json = jest.fn().mockRejectedValue(new Error('Internal Server Error'));
        // mocking the `json` method of the `NextResponse` object.
        NextResponse.json = jest.fn().mockImplementation((elem) => (elem));

        // ACT
        const response = await POST(req as unknown as NextRequest);

        // ASSERT
        expect(response).toEqual(NextResponse.json({ success: false }, { status: 500 }));
    });

    it('should return a 400 error response when a user already exists', async () => {
        // ARRANGE
        // Mocking the request
        const req = {
            json: jest.fn().mockResolvedValue(testData)
        };
        req.json = jest.fn().mockResolvedValue(testData);
        // mocking the `json` method of the `NextResponse` object.
        NextResponse.json = jest.fn().mockImplementation((elem) => (elem));
        User.findOne = jest.fn().mockResolvedValue(true);

        // ACT
        const response = await POST(req as unknown as NextRequest);

        // ASSERT
        expect(response).toEqual(NextResponse.json({ success: false }, { status: 400 }));
    });
});
