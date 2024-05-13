'use server'

import { redirect } from "next/navigation";
import { signUpFormSchema, SignUpState } from "../../types/validation.types"


export const signUp = async (
    locale: string, 
    prevState: SignUpState, 
    formData: FormData
): Promise<SignUpState> => {
    const validatedFields = signUpFormSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        console.log({
            errors: validatedFields.error.flatten().fieldErrors
        });
        return {
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    try {
        const res = await fetch(`${process.env.BASE_URL}/api/users/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: formData.get('username'),
                email: formData.get('email'),
                password: formData.get('pass'),
                locale: locale,
            }),
        });

        switch (res.status) {
            case 400:
                return {
                    errors: {
                        email: ['emailTakenError'],
                    }
                }
            case 500:
                return {
                    errors: {
                        confirmPass: ['internalError'],
                    }
                }
        }

    } catch (error) {
        return {
            errors: {
                confirmPass: ['internalError'],
            }
        }
    }
    redirect('/sign-in?redirect=signup-success');
}