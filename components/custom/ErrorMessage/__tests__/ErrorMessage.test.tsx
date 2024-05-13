import { render, screen } from '@testing-library/react';
import ErrorMessage from '../ErrorMessage';


describe('ErrorMessage Component', () => {
    it('should render a paragraph with a provided text', () => {
        // ARRANGE
        render(
            <ErrorMessage message='test message' />
        );

        // ACT
        const message = screen.getByText('test message');

        // ASSERT
        expect(message).toBeInTheDocument();
    });

    it('should not render when the message value in undefined', () => {
        // ARRANGE
        render(
            <ErrorMessage message={undefined} />
        );

        // ACT
        const message = screen.queryByText('test message');

        // ASSERT
        expect(message).not.toBeInTheDocument();
    });
});