'use client'

import { PowerIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'


const LogOutBtn = ({ label }: { label: string }) => {
    const router = useRouter();

    const onClickHandle = async () => {
        try {
            await fetch('/api/users/signout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            router.push('/sign-in');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {label.length > 0 && (
                <button 
                    className="w-1/5 md:w-full flex flex-row py-3 justify-center gap-3 text-gray-500 font-bold rounded-lg text-base hover:bg-gray-200 hover:text-gray-800 md:px-[10px] md:justify-start"
                    onClick={onClickHandle}
                >
                    <PowerIcon className="w-8 md:w-6" />
                    <span className="hidden md:block">
                        {label}
                    </span>
                </button>
            )}
        </>
    )
}

export default LogOutBtn