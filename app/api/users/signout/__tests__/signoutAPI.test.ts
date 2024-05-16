import { GET } from "../route";
import { NextRequest, NextResponse } from "next/server";


// Mocking the database connection
jest.mock('../../../../../lib/database/index', () => ({
    __esModule: true,
    default: jest.fn().mockResolvedValue({}),
}));

describe('api/users/signout', () => {
	afterEach(() => {
		// Reset mocks before after test
		jest.clearAllMocks();
	});

	it('should create a new token and set it to the response with status 201', async () => {
		// Mock request object
		const req = {} as NextRequest;

		// Mock NextResponse.json() to return a response
		const mockNextResponse = { 
			json: jest.fn().mockImplementation((elem) => (elem)),
			cookies: { set: jest.fn() }
		};
		NextResponse.json = jest.fn().mockReturnValue(mockNextResponse);

		// Call the GET function
		const response = await GET(req);

		// Assertions
		expect(NextResponse.json).toHaveBeenCalledWith({ success: true }, { status: 201 });
		expect(mockNextResponse.cookies.set).toHaveBeenCalledWith('auth-kanban', '', { httpOnly: true, expires: new Date(0) });
		expect(response).toEqual(NextResponse.json({ success: true }, { status: 201 }));
	});

    it('should return a response with a status 500 if error occured', async () => {
		// Mock request object
		const req = {} as NextRequest;

		// Mock NextResponse.json() to return a response
		NextResponse.json = jest.fn().mockReturnValue({
            cookies: {
                set: jest.fn(() => new Error("test error"))
            }
        });

		// Call the GET function
		const response = await GET(req);

		// Assertions
		expect(response).toEqual(NextResponse.json({ success: false }, { status: 500 }));
    });
});
