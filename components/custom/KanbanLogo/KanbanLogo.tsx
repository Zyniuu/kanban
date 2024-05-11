import { cn } from '@/lib/utils';
import { SparklesIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';


type Props = {
    variant: 'big' | 'small',
    params: {
        locale: string,
    },
}

const KanbanLogo = ({ variant, params: { locale } }: Props) => {

    return (
        <Link
            href={variant == 'big' ? '/' : '/kanban'}
            className={cn(
                'flex flex-row items-center gap-4 text-gray-800',
                { 'w-full': variant == 'big' }
            )}
        >
            <SparklesIcon
                data-testid='SparklesIcon'
                className={cn(
                    '',
                    { 'h-12 w-12': variant == 'small', 'h-32 w-32': variant == 'big' }
                )}
            />
            <span
                className={cn(
                    'uppercase font-bold',
                    { 'text-2xl': variant == 'small', 'text-5xl': variant == 'big' }
                )}
            >
                Kanban
            </span>
        </Link>
    )
}

export default KanbanLogo