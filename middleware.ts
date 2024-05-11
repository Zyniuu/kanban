import createMiddleware from 'next-intl/middleware';
import { defaultLocale, localePrefix, locales } from './i18n.config';

 
export default createMiddleware({
    locales: locales,
    defaultLocale: defaultLocale,
    localePrefix: localePrefix,
});
 
export const config = {
    // Match only internationalized pathnames
    matcher: [
        '/', 
        `/(de|pl)/:path*`,
        '/((?!_next|_vercel|.*\\..*).*)'
    ]
};