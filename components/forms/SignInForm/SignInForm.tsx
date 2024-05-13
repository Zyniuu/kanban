'use client'

import AuthTitle from "@/components/custom/AuthTitle/AuthTitle"
import KanbanLogo from "@/components/custom/KanbanLogo/KanbanLogo"
import PassInput from "@/components/custom/PassInput/PassInput"
import TEInput from "@/components/custom/TEInput/TEInput"
import { useToast } from "@/components/ui/use-toast"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { memo, useRef } from "react"


type Props = {
    params: {
        locale: string,
    },
}

const SignInForm = ({ params: { locale } }: Props) => {
    const t = useTranslations('Forms');
    const tToast = useTranslations('Toasts');
    const searchParams = useSearchParams();
    const { toast } = useToast();
    let wasShown = useRef(false);

    if(!wasShown.current && searchParams.get('redirect') === 'signup-success') {
        setTimeout(() => {
            toast({
                title: tToast('signupSuccessTitle'),
                description: tToast('signupSuccessDesc'),
                variant: 'success',
            });
        });
        wasShown.current = true;
    }

    return (
        <form className='flex flex-col gap-y-10 h-full w-full'>
            <div className='w-full'>
                <KanbanLogo variant="big" />
            </div>
            <div className='w-full'>
                <AuthTitle title={t('signinTitle')} description={t('signinDesc')} />
            </div>
            <div className='flex flex-col gap-y-5 w-full'>
                <div className='w-full'>
                    <TEInput label={t('email')} placeholder={t('emailPlaceholder')} id='email' ariaDescribedBy='email error' type='email' />
                    <div id='email error' aria-live='polite' aria-atomic='true'>
                    </div>
                </div>
                <div className='w-full'>
                    <PassInput label={t('pass')} placeholder={t('passPlaceholder')} id='pass' ariaDescribedBy='pass error' />
                    <div id='pass error' aria-live='polite' aria-atomic='true'>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-y-5 pb-5 w-full'>
               {/* <SignInButton btnText={t('signin')} /> */}
                <button className='w-full bg-gray-800 text-white py-3 rounded-lg hover:opacity-80 disabled:opacity-80'>
                    {t('signinTitle')}
                </button>

                <p className="w-full text-center text-base text-gray-800">
                    {t('noAccount')} &nbsp;
                    <Link
                        href='/sign-up'
                        className="text-blue-500 underline"
                    >
                        {t('signupBtn')}
                    </Link>
                </p>
            </div>
        </form>
    )
}

export default memo(SignInForm)