import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import TEInput from '../TEInput';
import { act } from 'react';


describe('TEInput Component', () => {
    // Arrange
    const label = 'Test Label';
    const placeholder = 'Test Placeholder';
    const id = 'test-id';
    const ariaDescribedBy = 'test-described-by';
    const type = 'text';

    beforeEach(() => {
        render(
            <TEInput
                label={label} 
                placeholder={placeholder} 
                id={id} 
                ariaDescribedBy={ariaDescribedBy} 
                type={type}
            />
        );
    });

    it('should render an input with provided props', () => {
        // ACT
        const withLabel = screen.getByLabelText(label);
        const withPlaceholder = screen.getByPlaceholderText(placeholder);
        
        // ASSERT
        expect(withLabel).toBeInTheDocument();
        expect(withPlaceholder).toBeInTheDocument();
        expect(withPlaceholder).toHaveAttribute('id', id);
    });

    it('should show XCircleIcon when input value is not empty', async () => {
        // Act
        const input = screen.getByPlaceholderText(placeholder);
        await act(async () => {
            fireEvent.change(input, { target: { value: 'Test Value' } });
        });
        const icon = screen.getByTestId(id);
  
        // Assert
        expect(icon).toBeInTheDocument();
      });

    it('should clear the input after clicking XCircleIcon', async () => {
        // Act
        const input = screen.getByPlaceholderText(placeholder);
        await act(async () => {
            fireEvent.change(input, { target: { value: 'Test Value' } });
        });
        const icon = screen.getByTestId(id);
        await act(async () => {
            fireEvent.click(icon);
        });

        // Assert
        expect(input).toHaveValue('');
    });
});