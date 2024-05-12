import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import SignUpForm from '../SignUpForm';


describe('SignUpForm Component', () => {
    const locale = 'en';
    const messages = require(`../../../../messages/${locale}.json`);

    beforeEach(() => {
        // ARRANGE
        render(
            <NextIntlClientProvider messages={messages} locale={locale}>
                <SignUpForm params={{ locale }} />
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
        const title = screen.getByRole('heading', { name: 'Create an account' });
        const description = screen.getByText('Please fill in the details below to create your account.');

        // ASSERT
        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
    });

    it('should render 4 inputs with empty values', () => {
        // ACT
        const inputsArray = screen.getAllByDisplayValue('');

        // ASSERT
        expect(inputsArray.length).toBe(4);
    });

    it('should render a sign up button', () => {
        // ACT
        const button = screen.getByRole('button', { name: 'Sign Up' });

        // ASSERT
        expect(button).toBeInTheDocument();
    });

    it('should render a prompt about signing in to the account', () => {
        // ACT
        const prompt = screen.getByText("Already have an account?");
        const link = screen.getByRole('link', { name: 'Sign In' });

        // ASSERT
        expect(prompt).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/sign-in');
    });
});