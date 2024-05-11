import { Squares2X2Icon } from '@heroicons/react/24/outline';
import { BellIcon } from '@heroicons/react/24/outline';
import { UsersIcon } from '@heroicons/react/24/outline';
import { Cog8ToothIcon } from '@heroicons/react/24/outline';


export const links = [
    { label: 'boards',        href: '/kanban',                icon: Squares2X2Icon },
    { label: 'notifications', href: '/kanban/notifications',  icon: BellIcon       },
    { label: 'teams',         href: '/kanban/teams',          icon: UsersIcon      },
    { label: 'settings',      href: '/kanban/settings',       icon: Cog8ToothIcon  },
]
