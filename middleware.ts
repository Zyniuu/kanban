import createMiddleware from 'next-intl/middleware';
import { defaultLocale, localePrefix, locales } from './i18n.config';
import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';
import { notFound } from 'next/navigation';


const publicPages = [
    '/',
    '/sign-in',
    '/sign-up',
];
 
const intlMiddleware = createMiddleware({
    locales: locales,
    defaultLocale: defaultLocale,
    localePrefix: localePrefix,
});

const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPages.flatMap((p) => (p === "/" ? ["", "/"] : p)).join("|")})/?$`,
    "i"
)

const authMiddleware = auth((req) => {
    const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
    const isKanban = req.nextUrl.pathname.includes('/kanban');
    const isLoggedIn = !!req.auth;

    switch (true) {
        case isKanban && isLoggedIn:
            return intlMiddleware(req);
        case isKanban:
            return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
        case isLoggedIn:
            return NextResponse.redirect(new URL('/kanban', req.nextUrl));
        case isPublicPage:
            return intlMiddleware(req);
        default:
            return notFound();
    }
});

export default function middleware(req: NextRequest) {
    return (authMiddleware as any)(req);
}

export const config = {
    // Match only internationalized pathnames
    matcher: [
        '/', 
        `/(de|pl)/:path*`,
        '/((?!_next|_vercel|.*\\..*).*)'
    ]
};