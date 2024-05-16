import { signinValidate } from "../signin.action";


describe('signin action function', () => {
    it('should return no errors when form data is valid', async () => {
        const formData = new FormData();
        formData.append('email', 'test@example.com');
        formData.append('pass', 'password');

        const result = await signinValidate(formData);

        expect(result).toEqual({ errors: {} });
    })

    it('should return empty fields errors when email and pass are empty', async () => {
        const formData = new FormData();
        formData.append('email', '');
        formData.append('pass', '');

        const result = await signinValidate(formData);

        expect(result).toEqual({
            errors: {
                email: [ 'emailEmptyError', 'emailInvalidError' ],
                pass: [ 'passEmptyError' ]
            }
        });
    });

    it('should return an invalid email error when invalid email was provided', async () => {
        const formData = new FormData();
        formData.append('email', 'test@example');
        formData.append('pass', 'password');

        const result = await signinValidate(formData);

        expect(result).toEqual({ errors: { email: [ 'emailInvalidError' ] } });
    })
});