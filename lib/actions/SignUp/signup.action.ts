'use server'

import { redirect } from "next/navigation";
import { signUpFormSchema, SignUpState } from "../../types/validation.types"
import connectToDatabase from "@/lib/database";
import User from '@/lib/database/models/user.model';
import bcrypt from 'bcryptjs';


export const signUp = async (
    locale: string, 
    prevState: SignUpState, 
    formData: FormData
): Promise<SignUpState> => {
    const validatedFields = signUpFormSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    try {
        connectToDatabase();
        // check if user with given email already exists
        const user = await User.findOne({ email: validatedFields.data.email });
        if (user) return { errors: { email: ['emailTakenError'] } };
        // hash the password
        const hashedPassword = await bcrypt.hash(validatedFields.data.pass, 10);
        // save user to the database
        const newUser = new User({
            username: validatedFields.data.username,
            email: validatedFields.data.email,
            password: hashedPassword,
            locale: locale,
        });
        await newUser.save();
    } catch (error) {
        return { errors: { confirmPass: ['internalError'] } };
    }

    redirect(`/sign-in?redirect=signup-success`);
}