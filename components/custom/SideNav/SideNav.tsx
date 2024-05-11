import KanbanLogo from "../KanbanLogo/KanbanLogo"
import NavLinks from "../NavLinks/NavLinks"
import { useTranslations } from "next-intl"
import { PowerIcon } from '@heroicons/react/24/outline'


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
                    <KanbanLogo params={{locale}} variant="small" />
                </div>
            </div>

            <div className="flex flex-row gap-x-1 justify-between grow w-11/12 mx-auto md:pb-4 md:flex-col md:w-[85%] md:gap-y-1 md:h-full md:justify-start">
                <NavLinks params={{locale}} />

                <div className="hidden h-full md:block"></div>

                <button className="flex flex-row py-3 w-full justify-center gap-3 text-gray-500 font-bold rounded-lg text-base hover:bg-gray-200 hover:text-gray-800 md:px-[10px] md:justify-start">
                    <PowerIcon className="w-8 md:w-6" />
                    <span className="hidden md:block">
                        {t('logout')}
                    </span>
                </button>
            </div>
        </div>
    )
}

export default SideNav