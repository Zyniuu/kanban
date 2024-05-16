import { NextIntlClientProvider } from 'next-intl';
import { render, screen } from '@testing-library/react';
import SideNav from '../SideNav';


jest.mock('next/navigation', () => ({
    ...jest.requireActual('next/navigation'),
    useRouter: jest.fn().mockReturnValue({
        push: jest.fn(),
    }),
}));

describe('SideNav Component', () => {
    const links = [
        { label: 'Boards',          icon: 'boards'        },
        { label: 'Notifications',   icon: 'notifications' },
        { label: 'Teams',           icon: 'teams'         },
        { label: 'Settings',        icon: 'settings'      },
    ]
    const locale = 'en';
    const messages = require(`../../../../messages/${locale}.json`);

    beforeEach(() => {
        // ARRANGE
        render( 
            <NextIntlClientProvider messages={messages} locale={locale}>
                <SideNav params={{locale}} />
            </NextIntlClientProvider>
        );
    });

    it('should render a logout button', () => {
        // ACT
        const logoutBtn = screen.getByRole('button', { name: /sign out/i });
        // ASSERT
        expect(logoutBtn).toBeInTheDocument();
    });

    it('should render kanban logo', () => {
        // ACT
        const logoImage = screen.getByTestId('SparklesIcon');
        const logoText = screen.getByText(/kanban/i);
        // ASSERT
        expect(logoImage).toBeInTheDocument();
        expect(logoText).toBeInTheDocument();
    });

    it('should render all navigation links', () => {
        // ACT & ASSERT
        links.map((link) => {
            const navLink = screen.getByRole('link', { name: link.label });
            const navIcon = screen.getByTestId(link.icon);
            expect(navLink).toBeInTheDocument();
            expect(navIcon).toBeInTheDocument();
        });
    });
});