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
        <main className="flex justify-center items-center w-screen h-screen overflow-x-hidden">
            <div className="flex flex-row w-full h-full md:p-10">
                <div className="w-0 min-h-full rounded-[40px] bg-gradient-to-br from-gray-800 to-gray-500 lg:w-1/2">
                </div>
                <div className="flex justify-center items-center w-full h-full lg:w-1/2 lg:overflow-auto">
                    <div className="w-11/12 h-full py-5 xl:w-[45%] ">
                        {children}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default KanbanLayout