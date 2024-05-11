'use client'

import { links } from "@/constants/navlinks"
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";


type Props = {
    params: {
        locale: string,
    }
}

const NavLinks = ({ params: { locale } }: Props) => {
    const t = useTranslations('SideNavLinks');
    const pathname = usePathname();

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        href={link.href}
                        key={link.label}
                        className={cn(
                            'nav__link',
                            { 'bg-gray-200 text-gray-800': pathname === `/${locale}${link.href}` }
                        )}
                    >
                        <LinkIcon data-testid={link.label} className="w-8 md:w-6" />
                        <span className="hidden md:block">
                            {t(link.label)}
                        </span>
                    </Link>
                );
            })}
        </>
    )
}

export default NavLinks