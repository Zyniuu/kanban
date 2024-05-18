import { type ClassValue, clsx } from "clsx"
import { NextRequest } from "next/server"
import { twMerge } from "tailwind-merge"
import jwt from "jsonwebtoken";


interface JwtPayload {
	id: string;
	username: string;
	email: string;
	locale: string;
	imageUrl: string;
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const getTokenData = (req: NextRequest) => {
	try {
		const token = req.cookies.get('auth-kanban')?.value || '';
		const AUTH_SECRET = process.env.AUTH_SECRET;
        if (!AUTH_SECRET) throw new Error('Please set the AUTH_SECRET environment variable');
		return jwt.verify(token, AUTH_SECRET) as JwtPayload;
	} catch (error: any) {
		throw new Error(error.message);
	}
}