import createMiddleware from 'next-intl/middleware';
import { defaultLocale, localePrefix, locales } from './i18n.config';
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

export default function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.includes('/api')) return;
    const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
    const isKanban = req.nextUrl.pathname.includes('/kanban');
    const isLoggedIn = !!req.cookies.get('auth-kanban')?.value;

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
}

export const config = {
    // Match only internationalized pathnames
    matcher: [
        '/', 
        `/(de|pl)/:path*`,
        '/((?!_next|_vercel|.*\\..*).*)'
    ]
};