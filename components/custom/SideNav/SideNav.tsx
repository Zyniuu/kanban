import KanbanLogo from "../KanbanLogo/KanbanLogo"
import NavLinks from "../NavLinks/NavLinks"
import { useTranslations } from "next-intl"
import { PowerIcon } from '@heroicons/react/24/outline'
import { memo } from "react"
import LogOutBtn from "../LogOutBtn/LogOutBtn"


type Props = {
    params: {
        locale: string,
    },
}

const SideNav = ({ params: { locale } }: Props) => {
    const t = useTranslations('SideNavLinks');

    return (
        <div className="flex h-full flex-col bg-white">
            <div className="h-20 bg-white md:h-40">
                <div className="flex flex-col justify-center w-11/12 mx-auto h-full md:w-[85%]">
                    <KanbanLogo variant="small" />
                </div>
            </div>

            <div className="flex flex-row gap-x-1 justify-between grow w-11/12 mx-auto md:pb-4 md:flex-col md:w-[85%] md:gap-y-1 md:h-full md:justify-start">
                <NavLinks params={{locale}} />

                <div className="hidden h-full md:block"></div>

                <LogOutBtn label={t('logout')} />
            </div>
        </div>
    )
}

export default memo(SideNav)