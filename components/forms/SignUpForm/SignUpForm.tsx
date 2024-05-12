import AuthTitle from "@/components/custom/AuthTitle/AuthTitle"
import KanbanLogo from "@/components/custom/KanbanLogo/KanbanLogo"
import PassInput from "@/components/custom/PassInput/PassInput"
import TEInput from "@/components/custom/TEInput/TEInput"
import { useTranslations } from "next-intl"
import Link from "next/link"

type Props = {
    params: {
        locale: string,
    },
}

const SignUpForm = ({ params: { locale } }: Props) => {
    const t = useTranslations('Forms');

    return (
        <form className='flex flex-col gap-y-10 h-full w-full'>
            <div className='w-full'>
                <KanbanLogo variant="big" />
            </div>
            <div className='w-full'>
                <AuthTitle title={t('signupTitle')} description={t('signupDesc')} />
            </div>
            <div className='flex flex-col gap-y-5 w-full'>
                <div className='w-full'>
                    <TEInput label={t('username')} placeholder={t('usernamePlaceholder')} id='username' ariaDescribedBy='user error' type='text' />
                    <div id='user error' aria-live='polite' aria-atomic='true'>
                    </div>
                </div>
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
                <div className='w-full'>
                    <PassInput label={t('confirmPass')} placeholder={t('confirmPassPlaceholder')} id='confirmPass' ariaDescribedBy='confirmPass error' />
                    <div id='pass error' aria-live='polite' aria-atomic='true'>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-y-5 pb-5 w-full'>
                {/*<SignUpButton btnText={t('signupBtn')} />*/}
                <button className='w-full bg-gray-800 text-white py-3 rounded-lg hover:opacity-80 disabled:opacity-80'>
                    {t('signupBtn')}
                </button>

                <p className="w-full text-center text-base text-gray-800">
                    {t('hasAccount')} &nbsp;
                    <Link
                        href='/sign-in'
                        className="text-blue-500 underline"
                    >
                        {t('signinTitle')}
                    </Link>
                </p>
            </div>
        </form>
    )
}

export default SignUpForm