import { render, screen } from '@testing-library/react';
import LogOutBtn from '../LogOutBtn';


jest.mock('next/navigation', () => ({
    ...jest.requireActual('next/navigation'),
    useRouter: jest.fn().mockReturnValue({
        push: jest.fn(),
    }),
}));

describe('LogOutButton Component', () => {
    it('should render a button with a provided text', () => {
        // ARRANGE
        render(
            <LogOutBtn label='Test Label' />
        );

        // ACT
        const btn = screen.getByRole('button', { name: 'Test Label' });

        // ASSERT
        expect(btn).toBeInTheDocument();
    });

    it('should not render a button if no text was provided', () => {
        // ARRANGE
        render(
            <LogOutBtn label='' />
        );

        // ACT
        const btn = screen.queryByRole('button');

        // ASSERT
        expect(btn).not.toBeInTheDocument();
    });
});