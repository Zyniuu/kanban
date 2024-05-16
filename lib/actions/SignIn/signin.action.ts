'use server'

import { signInFormSchema, SignInState } from "../../types/validation.types";


export const signinValidate = async (formData: FormData): Promise<SignInState> => {
    const validatedFields = signInFormSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    return { errors: {} };
}