'use client'

import { memo, useCallback, useState } from "react";
import { EyeIcon } from '@heroicons/react/24/outline'
import { EyeSlashIcon } from '@heroicons/react/24/outline'


type Props = {
    label: string,
    placeholder: string,
    id: string,
    ariaDescribedBy: string,
}

const PassInput = ({ label, placeholder, id, ariaDescribedBy }: Props) => {
    const [visible, setVisible] = useState(false);

    const handleClick = useCallback(() => {
        setVisible(prevVisible => !prevVisible);
    }, []);

    return (
        <div className='flex flex-col gap-y-1 w-full'>
            <label htmlFor={id} className='w-full text-base text-gray-800'>
                {label}
            </label>
            <div className='w-full relative'>
                <input 
                    className='w-full pl-[14px] pr-12 py-3 border-2 border-gray-300 rounded-lg placeholder:text-gray-400 outline-none'
                    type={ !visible ? "password" : "text" }
                    id={id}
                    aria-describedby={ariaDescribedBy}
                    name={id}
                    placeholder={placeholder}
                    autoComplete="off"
                />
                {!visible ? (
                    <EyeSlashIcon
                        className='cursor-pointer w-6 h-6 absolute top-1/2 -translate-y-1/2 right-3 text-gray-400 hover:text-gray-800'
                        onClick={handleClick}
                        data-testid={`${id}-eyeslash`}
                    />
                ) : (
                    <EyeIcon
                        className='cursor-pointer w-6 h-6 absolute top-1/2 -translate-y-1/2 right-3 text-gray-400 hover:text-gray-800'
                        onClick={handleClick}
                        data-testid={`${id}-eye`}
                    />
                )}

            </div>
        </div>
    )
}

export default memo(PassInput)