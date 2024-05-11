import { NextIntlClientProvider } from 'next-intl';
import { render, screen } from '@testing-library/react';
import SideNav from '../SideNav';


describe('SideNav Component', () => {
    const links = [
        { label: 'Boards',          icon: 'boards'        },
        { label: 'Notifications',   icon: 'notifications' },
        { label: 'Teams',           icon: 'teams'         },
        { label: 'Settings',        icon: 'settings'      },
    ]
    const locale = 'en';
    const messages = require(`../../../../messages/${locale}.json`);

    it('should render a logout button', () => {
        // ARRANGE
        render( 
            <NextIntlClientProvider messages={messages} locale={locale}>
                <SideNav params={{locale}} />
            </NextIntlClientProvider>
        );
        // ACT
        const logoutBtn = screen.getByRole('button', { name: /sign out/i });
        // ASSERT
        expect(logoutBtn).toBeInTheDocument();
    });

    it('should render kanban logo', () => {
        // ARRANGE
        render( 
            <NextIntlClientProvider messages={messages} locale={locale}>
                <SideNav params={{locale}} />
            </NextIntlClientProvider>
        );
        // ACT
        const logoImage = screen.getByTestId('SparklesIcon');
        const logoText = screen.getByText(/kanban/i);
        // ASSERT
        expect(logoImage).toBeInTheDocument();
        expect(logoText).toBeInTheDocument();
    });

    it('should render all navigation links', () => {
        // ARRANGE
        render( 
            <NextIntlClientProvider messages={messages} locale={locale}>
                <SideNav params={{locale}} />
            </NextIntlClientProvider>
        );
        // ACT & ASSERT
        links.map((link) => {
            const navLink = screen.getByRole('link', { name: link.label });
            const navIcon = screen.getByTestId(link.icon);
            expect(navLink).toBeInTheDocument();
            expect(navIcon).toBeInTheDocument();
        });
    });
});