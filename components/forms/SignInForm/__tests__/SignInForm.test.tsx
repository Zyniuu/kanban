import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import SignInForm from '../SignInForm';


jest.mock('next/navigation', () => ({
    ...jest.requireActual('next/navigation'),
    useSearchParams: jest.fn().mockReturnValue({
        get: () => 'signup-success',
    }),
}));

describe('SignInForm Component', () => {
    const locale = 'en';
    const messages = require(`../../../../messages/${locale}.json`);

    beforeEach(() => {
        // ARRANGE
        render(
            <NextIntlClientProvider messages={messages} locale={locale}>
                <SignInForm params={{ locale }} />
            </NextIntlClientProvider>
        );
    });

    it('should render a logo', () => {
        // ACT
        const logoIcon = screen.getByTestId('SparklesIcon');
        const logoText = screen.getByText(/kanban/i);
        
        // ASSERT
        expect(logoIcon).toBeInTheDocument();
        expect(logoText).toBeInTheDocument();
    });

    it('should render a title with description', () => {
        // ACT
        const title = screen.getByRole('heading', { name: 'Sign In' });
        const description = screen.getByText('Please fill in the details below to access your account.');

        // ASSERT
        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
    });

    it('should render 2 inputs with empty values', () => {
        // ACT
        const inputsArray = screen.getAllByDisplayValue('');

        // ASSERT
        expect(inputsArray.length).toBe(2);
    });

    it('should render a sign in button', () => {
        // ACT
        const button = screen.getByRole('button', { name: 'Sign In' });

        // ASSERT
        expect(button).toBeInTheDocument();
    });

    it('should render a prompt about creating a new account with a link', () => {
        // ACT
        const prompt = screen.getByText("Don't have an account?");
        const link = screen.getByRole('link', { name: 'Sign Up' });

        // ASSERT
        expect(prompt).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/sign-up');
    });
});