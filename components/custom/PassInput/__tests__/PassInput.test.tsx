import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import PassInput from '../PassInput';
import { act } from 'react';


describe('PassInput Component', () => {
    // ARRANGE
    const label = "Password";
    const placeholder = "Enter your password";
    const id = "password";
    const ariaDescribedBy = "password-description";

    beforeEach(() => {
        render(
            <PassInput
                label={label} 
                placeholder={placeholder} 
                id={id} 
                ariaDescribedBy={ariaDescribedBy}
            />
        );
    });

    it('should render a label and input field with correct props', () => {
        // Act
        const labelElem = screen.getByLabelText(label);
        const inputElem = screen.getByPlaceholderText(placeholder);
        const iconElem = screen.getByTestId(`${id}-eye`);

        // Assert
        expect(labelElem).toBeInTheDocument();
        expect(inputElem).toBeInTheDocument();
        expect(iconElem).toBeInTheDocument();
    });

    it('should toggle password visibility when eye icon is clicked', async () => {
        // Act
        await act(async () => {
            fireEvent.click(screen.getByTestId(`${id}-eye`));
        });
  
        // Assert
        expect(screen.getByTestId(`${id}-eyeslash`)).toBeInTheDocument();
        expect(screen.queryByTestId(`${id}-eye`)).not.toBeInTheDocument();
        expect(screen.getByLabelText(label)).toHaveAttribute('type', 'text');

        // Act
        await act(async () => {
            fireEvent.click(screen.getByTestId(`${id}-eyeslash`));
        });

        // Assert
        expect(screen.getByTestId(`${id}-eye`)).toBeInTheDocument();
        expect(screen.queryByTestId(`${id}-eyeslash`)).not.toBeInTheDocument();
        expect(screen.getByLabelText(label)).toHaveAttribute('type', 'password');
    });
});
