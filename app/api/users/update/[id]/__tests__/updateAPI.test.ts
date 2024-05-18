import User from '../../../../../../lib/database/models/user.model';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { PUT } from '../route';


// Mocking the database connection
jest.mock('../../../../../../lib/database/index', () => ({
    __esModule: true,
    default: jest.fn().mockResolvedValue({}),
}));

describe('api/users/update', () => {
    it('should update user and return 201 status code with locale data in response', async () => {
        // Mock dependencies
        const req = {
            json: jest.fn().mockResolvedValue({}),
        };
        const params = { id: '123' };
        const AUTH_SECRET = 'secret';
        process.env.AUTH_SECRET = AUTH_SECRET;
        const user = {
            _id: '123',
            username: 'testuser',
            email: 'test@example.com',
            locale: 'en',
            imageUrl: '/images/user.png',
        };
        const token = 'token';
        const res = {
            cookies: { set: jest.fn() },
        };
        User.findByIdAndUpdate = jest.fn().mockResolvedValue(user);
        jwt.sign = jest.fn().mockReturnValue(token);
        NextResponse.json = jest.fn().mockReturnValue(res);

        // Invoke PUT function
        await PUT(req as unknown as NextRequest, { params });

        // Assertions
        expect(User.findByIdAndUpdate).toHaveBeenCalledWith(params.id, {}, {
            new: true,
            runValidators: true,
        });
        expect(jwt.sign).toHaveBeenCalledWith({
            id: user._id,
            username: user.username,
            email: user.email,
            locale: user.locale,
            imageUrl: user.imageUrl,
        }, AUTH_SECRET, { 
            expiresIn: '1d' 
        });
        expect(NextResponse.json).toHaveBeenCalledWith({ success: true, data: { locale: user.locale } }, { status: 201 });
        expect(res.cookies.set).toHaveBeenCalledWith('auth-kanban', token, { httpOnly: true });
    });

    it('should return 500 status code if there is an error during update', async () => {
        // Mock dependencies
        const req = {
            json: jest.fn().mockResolvedValue({}),
        };
        const params = { id: '123' };
        User.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error('Update error'));
        NextResponse.json = jest.fn().mockImplementation((elem) => (elem));

        // Invoke PUT function
        const response = await PUT(req as unknown as NextRequest, { params });

        // Assertions
        expect(User.findByIdAndUpdate).toHaveBeenCalledWith(params.id, {}, {
            new: true,
            runValidators: true,
        });
        expect(response).toEqual(NextResponse.json({ success: false }, { status: 500 }));
    });

    it('should return 500 status code if there is an error setting cookie', async () => {
        // Mock dependencies
        const req = {
            json: jest.fn().mockResolvedValue({}),
        };
        const params = { id: '123' };
        const AUTH_SECRET = 'secret';
        process.env.AUTH_SECRET = AUTH_SECRET;
        const user = {
            _id: '123',
            username: 'testuser',
            email: 'test@example.com',
            locale: 'en',
            imageUrl: 'test.jpg',
        };
        const token = 'token';
        const res = {
            cookies: {
                set: jest.fn().mockImplementation(() => {
                    throw new Error('Cookie error');
                }),
            },
        };
        User.findByIdAndUpdate = jest.fn().mockResolvedValue(user);
        jwt.sign = jest.fn().mockReturnValue(token);
        NextResponse.json = jest.fn().mockReturnValue(res);

        // Invoke PUT function
        const response = await PUT(req as unknown as NextRequest, { params });

        // Assertions
        expect(User.findByIdAndUpdate).toHaveBeenCalledWith(params.id, {}, {
            new: true,
            runValidators: true,
        });
        expect(jwt.sign).toHaveBeenCalledWith({
            id: user._id,
            username: user.username,
            email: user.email,
            locale: user.locale,
            imageUrl: user.imageUrl,
        }, AUTH_SECRET, { 
            expiresIn: '1d'
        });
        expect(NextResponse.json).toHaveBeenCalledWith({ success: true, data: { locale: user.locale } }, { status: 201 });
        expect(res.cookies.set).toHaveBeenCalledWith('auth-kanban', token, { httpOnly: true });
        expect(response).toEqual(NextResponse.json({ success: false }, { status: 500 }));
    });
});
