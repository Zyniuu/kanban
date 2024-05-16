import { POST } from "../route";
import User from '../../../../../lib/database/models/user.model';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";


// Mocking the database connection
jest.mock('../../../../../lib/database/index', () => ({
    __esModule: true,
    default: jest.fn().mockResolvedValue({}),
}));

describe('api/users/signin', () => {
	const testData = {
		email: 'test@example.com',
		password: 'password123',
	};
	afterEach(() => {
		// Reset mocks before after test
		jest.clearAllMocks();
	});

	it('should create a new token and set it to the response when email and password are valid', async () => {
		// Mock request object
		const req = {
			json: jest.fn().mockResolvedValue(testData)
		};

		const testUser = {
			_id: '123',
			username: 'testuser',
			email: 'test@example.com',
			locale: 'en',
			imageUrl: 'images/user.png',
			password: 'hashedPassword',
		};

		// Mock User.findOne() to return a user
		User.findOne = jest.fn().mockReturnValue(testUser);

		// Mock jwt.sign() to return a token
		jwt.sign = jest.fn().mockReturnValue('token');

		// Mock NextResponse.json() to return a response
		const mockNextResponse = { 
			json: jest.fn().mockImplementation((elem) => (elem)),
			cookies: { set: jest.fn() }
		};
		NextResponse.json = jest.fn().mockReturnValue(mockNextResponse);

		// Mock bcrypt.compare to always return true - simulating correct credentials
		bcrypt.compare = jest.fn().mockReturnValue(true);

		// Call the POST function
		const response = await POST(req as unknown as NextRequest);

		// Assertions
		expect(req.json).toHaveBeenCalledTimes(1);
		expect(User.findOne).toHaveBeenCalledWith({ email: testData.email });
		expect(bcrypt.compare).toHaveBeenCalledWith(testData.password, testUser.password);
		expect(jwt.sign).toHaveBeenCalledWith({ 
			id: '123',
			username: 'testuser',
			email: 'test@example.com',
			locale: 'en',
			imageUrl: 'images/user.png'
		},
		process.env.AUTH_SECRET,
		{ expiresIn: '1d' });
		expect(NextResponse.json).toHaveBeenCalledWith({ success: true, data: { locale: testUser.locale } }, { status: 201 });
		expect(mockNextResponse.cookies.set).toHaveBeenCalledWith('auth-kanban', 'token', { httpOnly: true });
		expect(response).toEqual(NextResponse.json({ success: true, data: { locale: testUser.locale } }, { status: 201 }));
	});

    it('should return a response with a status 400 when user with a given email does not exist', async () => {
      	// Mock request object
		const req = {
			json: jest.fn().mockResolvedValue(testData)
		};

		// Mock User.findOne() to simulate no found user
		User.findOne = jest.fn().mockReturnValue(false);

		// Mock the implementation of NextResponse.json
		NextResponse.json = jest.fn().mockImplementation((elem) => (elem));

		const response = await POST(req as unknown as NextRequest);

		expect(NextResponse.json).toHaveBeenCalledWith({ success: false }, { status: 400 });
		expect(response).toEqual(NextResponse.json({ success: false }, { status: 400 }));
    });

	it('should return a response with a status 400 when user with a given email exists but invalid password was provided', async () => {
      	// Mock request object
		  const req = {
			json: jest.fn().mockResolvedValue(testData)
		};

		const testUser = {
			_id: '123',
			username: 'testuser',
			email: 'test@example.com',
			locale: 'en',
			imageUrl: 'images/user.png',
			password: 'hashedPassword',
		};

		// Mock User.findOne() to simulate user found
		User.findOne = jest.fn().mockReturnValue(testUser);

		// Mock bcrypt.compare to always return false - simulating invalid credentials
		bcrypt.compare = jest.fn().mockReturnValue(false);

		// Mock the implementation of NextResponse.json
		NextResponse.json = jest.fn().mockImplementation((elem) => (elem));

		const response = await POST(req as unknown as NextRequest);

		expect(bcrypt.compare).toHaveBeenCalledWith(testData.password, testUser.password);
		expect(NextResponse.json).toHaveBeenCalledWith({ success: false }, { status: 400 });
		expect(response).toEqual(NextResponse.json({ success: false }, { status: 400 }));
	});

	it('should return a response with a status 500 if error occured', async () => {
      	// Mock request object
		  const req = {
			json: jest.fn().mockResolvedValue(testData)
		};

		// Mock User.findOne() to simulate user found
		User.findOne = jest.fn().mockRejectedValue(new Error('Internal server test error'));

		// Mock the implementation of NextResponse.json
		NextResponse.json = jest.fn().mockImplementation((elem) => (elem));

		const response = await POST(req as unknown as NextRequest);

		expect(NextResponse.json).toHaveBeenCalledWith({ success: false }, { status: 500 });
		expect(response).toEqual(NextResponse.json({ success: false }, { status: 500 }));
	});
});
