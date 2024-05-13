import { z } from "zod";


export type SignUpState = {
    errors?: {
        username?: string[] | undefined,
        email?: string[] | undefined,
        pass?: string[] | undefined,
        confirmPass?: string[] | undefined,
    },
};

export const signUpFormSchema = z.object({
    username: z
        .string()
        .min(1, { message: 'usernameEmptyError' })
        .min(4, { message: 'usernameTooShortError' }),
    email: z
        .string()
        .min(1, { message: 'emailEmptyError' })
        .email({ message: 'emailInvalidError' }),
    pass: z
        .string()
        .min(1, { message: 'passEmptyError' })
        .min(6, { message: 'passTooShortError' }),
    confirmPass: z
        .string()
        .min(1, 'confirmPassEmptyError')
        .min(6, 'passTooShortError'),
}).refine((data) => data.pass === data.confirmPass, {
    path: ['confirmPass'],
    message: 'passNoMatchError',
});