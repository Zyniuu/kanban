import { render, screen } from '@testing-library/react';
import AuthTitle from '../AuthTitle';


describe('AuthTitle Component', () => {
    it('should render the title and description with the provided props', () => {
        // ARRANGE
        const title = 'Test Title';
        const description = 'Test Description';
        render(
            <AuthTitle title={title} description={description} />
        );

        // ACT
        const header = screen.getByRole('heading', { name: title });
        const paragraph = screen.getByText(description);

        // ASSERT
        expect(header).toBeInTheDocument();
        expect(paragraph).toBeInTheDocument();
    });
});