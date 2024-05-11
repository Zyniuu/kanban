import { NextIntlClientProvider } from 'next-intl';
import { render, screen } from '@testing-library/react';
import NavLinks from '../NavLinks';


jest.mock('next/navigation', () => ({
    usePathname: () => '/en/kanban',
}));

describe('NavLinks Component', () => {
    const links = [
        { label: 'Boards',          icon: 'boards'        },
        { label: 'Notifications',   icon: 'notifications' },
        { label: 'Teams',           icon: 'teams'         },
        { label: 'Settings',        icon: 'settings'      },
    ]
    const locale = 'en';
    const messages = require(`../../../../messages/${locale}.json`);

    beforeEach(() => {
        render(
            <NextIntlClientProvider messages={messages} locale={locale}>
                <NavLinks params={{locale}} />
            </NextIntlClientProvider>
        );
    });

    it('should render all 4 links with labels and icons', () => {
        // ACT
        const linksArray = screen.getAllByRole('link');
        // ASSERT
        expect(linksArray.length).toBe(4);
        links.forEach((link) => {
            expect(screen.getByRole('link', { name: link.label })).toBeInTheDocument();
            expect(screen.getByTestId(link.icon)).toBeInTheDocument();
        });
    });

    it('should render active link with different background and text color', () => {
        // ACT
        const activeLink = screen.getByRole('link', { name: 'Boards' });
        // ASSERT
        expect(activeLink).toHaveClass('bg-gray-200 text-gray-800');
    });
});