import { NextIntlClientProvider } from 'next-intl';
import { render, screen } from '@testing-library/react';
import KanbanLogo from '../KanbanLogo';


describe('KanbanLogo Component', () => {
    const locale = 'en';
    const messages = require(`../../../../messages/${locale}.json`);

    it('should render the Kanban logo with an Sparkles icon and text "Kanban"', () => {
        // ARRANGE
        render(
            <NextIntlClientProvider messages={messages} locale={locale}>
                <KanbanLogo variant='big' params={{locale}} />
            </NextIntlClientProvider>
        );
        // ACT
        const logoImage = screen.getByTestId('SparklesIcon');
        const logoText = screen.getByText(/kanban/i);
        // ASSERT
        expect(logoImage).toBeInTheDocument();
        expect(logoText).toBeInTheDocument();
    });

    it('should render a link with href="/" when variant is set to big', () => {
        // ARRANGE
        render(
            <NextIntlClientProvider messages={messages} locale={locale}>
                <KanbanLogo variant='big' params={{locale}} />
            </NextIntlClientProvider>
        );
        // ACT
        const link = screen.getByRole('link');
        // ASSERT
        expect(link).toHaveAttribute('href', '/');
    });

    it('should render a link with href="/kanban" when variant is set to small', () => {
        // ARRANGE
        render(
            <NextIntlClientProvider messages={messages} locale={locale}>
                <KanbanLogo variant='small' params={{locale}} />
            </NextIntlClientProvider>
        );
        // ACT
        const link = screen.getByRole('link');
        // ASSERT
        expect(link).toHaveAttribute('href', '/kanban');
    });

    it('should render a big logo when variant is set to big', () => {
        // ARRANGE
        render(
            <NextIntlClientProvider messages={messages} locale={locale}>
                <KanbanLogo variant='big' params={{locale}} />
            </NextIntlClientProvider>
        );
        // ACT
        const logoImage = screen.getByTestId('SparklesIcon');
        // ASSERT
        expect(logoImage).toHaveClass('h-32 w-32');
    });

    it('should render a small logo when variant is set to small', () => {
        // ARRANGE
        render(
            <NextIntlClientProvider messages={messages} locale={locale}>
                <KanbanLogo variant='small' params={{locale}} />
            </NextIntlClientProvider>
        );
        // ACT
        const logoImage = screen.getByTestId('SparklesIcon');
        // ASSERT
        expect(logoImage).toHaveClass('h-12 w-12');
    });

    it('should render a big text when variant is set to big', () => {
        // ARRANGE
        render(
            <NextIntlClientProvider messages={messages} locale={locale}>
                <KanbanLogo variant='big' params={{locale}} />
            </NextIntlClientProvider>
        );
        // ACT
        const logoText = screen.getByText(/kanban/i);
        // ASSERT
        expect(logoText).toHaveClass('text-5xl');
    });

    it('should render a small text when variant is set to small', () => {
        // ARRANGE
        render(
            <NextIntlClientProvider messages={messages} locale={locale}>
                <KanbanLogo variant='small' params={{locale}} />
            </NextIntlClientProvider>
        );
        // ACT
        const logoText = screen.getByText(/kanban/i);
        // ASSERT
        expect(logoText).toHaveClass('text-2xl');
    });
});