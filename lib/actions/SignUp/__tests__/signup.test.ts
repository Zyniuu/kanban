import { redirect } from "next/navigation";
import { signUp } from "../signup.action";
import User from '../../../database/models/user.model';
import bcrypt from 'bcryptjs';


jest.mock('next/navigation', () => ({
    redirect: jest.fn(),
}));

// Mocking the database connection
jest.mock('../../../database/index', () => ({
    __esModule: true,
    default: jest.fn().mockResolvedValue({}),
}));

describe('signup action function', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should redirect to /sign-in page when valid form data is provided and user is created', async () => {
        // ARRANGE
        const formData = new FormData();
        formData.append('username', 'testuser');
        formData.append('email', 'test@example.com');
        formData.append('pass', 'password123');
        formData.append('confirmPass', 'password123');
        User.findOne = jest.fn().mockResolvedValue(null);
        jest.spyOn(bcrypt, 'hash').mockImplementationOnce((elem) => ('hashedPassword'));
        User.prototype.save = jest.fn().mockResolvedValue({
            _id: '123456789',
            username: 'testuser',
            email: 'test@example.com',
            locale: 'en',
            imageUrl: '/images/user.png',
        });
        
        // ACT
        await signUp('en', { errors: {} }, formData);

        // ASSERTION
        expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
        expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
        expect(User.prototype.save).toHaveBeenCalled();
        expect(redirect).toHaveBeenCalledWith('/sign-in?redirect=signup-success');
    });

    it('should return errors when form fields are empty', async () => {
        // ARRANGE
        const formData = new FormData();
        formData.append('username', '');
        formData.append('email', '');
        formData.append('pass', '');
        formData.append('confirmPass', '');

        // ACT
        const result = await signUp('en', { errors: {} }, formData);

        // ASSERT
        expect(result).toEqual({
            errors: {
                username: [ 'usernameEmptyError', 'usernameTooShortError' ],     
                email: [ 'emailEmptyError', 'emailInvalidError' ],
                pass: [ 'passEmptyError', 'passTooShortError' ],
                confirmPass: [ 'confirmPassEmptyError', 'passTooShortError' ]    
            }
        });
    });

    it('should return passTooShortError when any of the provided passwords have less then 6 character', async () => {
        // ARRANGE
        const formData = new FormData();
        formData.append('username', 'testuser');
        formData.append('email', 'test@example.com');
        formData.append('pass', '123');
        formData.append('confirmPass', '123');

        // ACT
        const result = await signUp('en', { errors: {} }, formData);

        // ASSERT
        expect(result).toEqual({
            errors: {
                pass: [ 'passTooShortError' ],
                confirmPass: [ 'passTooShortError' ]
            }
        });
    });

    it('should return passNoMatchError when passwords have correct lengths but are not the same in value', async () => {
        // ARRANGE
        const formData = new FormData();
        formData.append('username', 'testuser');
        formData.append('email', 'test@example.com');
        formData.append('pass', '123456');
        formData.append('confirmPass', '654321');

        // ACT
        const result = await signUp('en', { errors: {} }, formData);

        // ASSERT
        expect(result).toEqual({ errors: { confirmPass: [ 'passNoMatchError' ] } });
    });

    it('should return usernameTooShortError when username has less than 4 characters and more than 1', async () => {
        // ARRANGE
        const formData = new FormData();
        formData.append('username', 'tev');
        formData.append('email', 'test@example.com');
        formData.append('pass', '123456');
        formData.append('confirmPass', '123456');

        // ACT
        const result = await signUp('en', { errors: {} }, formData);

        // ASSERT
        expect(result).toEqual({ errors: { username: [ 'usernameTooShortError' ] } });
    });

    it('should return emailInvalidError when invalid email is provided', async () => {
        // ARRANGE
        const formData = new FormData();
        formData.append('username', 'test');
        formData.append('email', 'test@example');
        formData.append('pass', '123456');
        formData.append('confirmPass', '123456');

        // ACT
        const result = await signUp('en', { errors: {} }, formData);

        // ASSERT
        expect(result).toEqual({ errors: { email: [ 'emailInvalidError' ] } });
    });

    it('should return emailTakenError when email is already registered', async () => {
        // ARRANGE
        const formData = new FormData();
        formData.append('username', 'test');
        formData.append('email', 'test@example.com');
        formData.append('pass', '123456');
        formData.append('confirmPass', '123456');
        User.findOne = jest.fn().mockResolvedValue(true);

        // ACT
        const result = await signUp('en', { errors: {} }, formData);

        // ASSERT
        expect(result).toEqual({ errors: { email: ['emailTakenError'] } });
    });

    it('should return internalError when response status is 500', async () => {
        // ARRANGE
        const formData = new FormData();
        formData.append('username', 'test');
        formData.append('email', 'test@example.com');
        formData.append('pass', '123456');
        formData.append('confirmPass', '123456');
        User.findOne = jest.fn().mockRejectedValue(new Error('Test Error'));

        // ACT
        const result = await signUp('en', { errors: {} }, formData);

        // ASSERT
        expect(result).toEqual({ errors: { confirmPass: ['internalError'] } });
    });
});