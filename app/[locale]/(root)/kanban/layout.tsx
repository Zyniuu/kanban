import SideNav from "@/components/custom/SideNav/SideNav"
import { karla } from "@/constants/fonts"
import { unstable_setRequestLocale } from "next-intl/server"


type Props = {
    children: string,
    params: {
        locale: string,
    }
}

const KanbanLayout = ({ children, params: { locale } }: Props) => {
    unstable_setRequestLocale(locale);

    return (
        <div className={`${karla.className} flex h-screen flex-col bg-white md:flex-row md:overflow-y-hidden`}>
            <div className="w-full flex-none md:w-64">
                <SideNav params={{locale}} />
            </div>
            <div className="bg-gray-100 w-full h-full md:rounded-tl-[32px] md:mt-3 md:overflow-y-auto">
                <div className="w-11/12 mx-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default KanbanLayout