// Text Email Input
'use client'

import { XCircleIcon } from '@heroicons/react/24/outline'
import { ChangeEvent, memo, useCallback, useState } from 'react'


type Props = {
    label: string,
    placeholder: string,
    id: string,
    ariaDescribedBy: string,
    type: 'text' | 'email',
}

const TEInput = ({ label, placeholder, id, ariaDescribedBy, type }: Props) => {
    const [value, setValue] = useState('');

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }, []);

    const handleClick = useCallback(() => {
        setValue('');
    }, []);

    return (
        <div className='flex flex-col gap-y-1 w-full'>
            <label htmlFor={id} className='w-full text-base text-gray-800'>
                {label}
            </label>
            <div className='w-full relative'>
                <input
                    className='w-full pl-[14px] py-3 border-2 border-gray-300 rounded-lg placeholder:text-gray-400 outline-none'
                    type={type}
                    id={id}
                    name={id}
                    aria-describedby={ariaDescribedBy}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                />
                {value.length > 0 && (
                    <XCircleIcon 
                        className='cursor-pointer w-6 h-6 absolute top-1/2 -translate-y-1/2 right-3 text-gray-400 hover:text-gray-800' 
                        onClick={handleClick}
                        data-testid={id}
                    />
                )}
            </div>
        </div>
    )
}

export default memo(TEInput)