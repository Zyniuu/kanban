'use client'

import AuthTitle from "@/components/custom/AuthTitle/AuthTitle"
import ErrorMessage from "@/components/custom/ErrorMessage/ErrorMessage"
import KanbanLogo from "@/components/custom/KanbanLogo/KanbanLogo"
import PassInput from "@/components/custom/PassInput/PassInput"
import TEInput from "@/components/custom/TEInput/TEInput"
import { signUp } from "@/lib/actions/SignUp/signup.action"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { memo } from "react"
import { useFormState, useFormStatus } from "react-dom"

type Props = {
    params: {
        locale: string,
    },
}

const SignUpForm = ({ params: { locale } }: Props) => {
    const t = useTranslations('Forms');
    const tErr = useTranslations('FormErrors');
    const signUpLocale = signUp.bind(null, locale);
    const [state, dispatch] = useFormState(signUpLocale, { errors: {} });

    return (
        <form action={dispatch} className='flex flex-col gap-y-10 h-full w-full'>
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
                        {state.errors?.username && (
                            <ErrorMessage message={tErr(state.errors.username.at(0))} />
                        )}
                    </div>
                </div>
                <div className='w-full'>
                    <TEInput label={t('email')} placeholder={t('emailPlaceholder')} id='email' ariaDescribedBy='email error' type='email' />
                    <div id='email error' aria-live='polite' aria-atomic='true'>
                        {state.errors?.email && (
                            <ErrorMessage message={tErr(state.errors.email.at(0))} />
                        )}
                    </div>
                </div>
                <div className='w-full'>
                    <PassInput label={t('pass')} placeholder={t('passPlaceholder')} id='pass' ariaDescribedBy='pass error' />
                    <div id='pass error' aria-live='polite' aria-atomic='true'>
                        {state.errors?.pass && (
                            <ErrorMessage message={tErr(state.errors.pass.at(0))} />
                        )}
                    </div>
                </div>
                <div className='w-full'>
                    <PassInput label={t('confirmPass')} placeholder={t('confirmPassPlaceholder')} id='confirmPass' ariaDescribedBy='confirmPass error' />
                    <div id='confirmPass error' aria-live='polite' aria-atomic='true'>
                        {state.errors?.confirmPass && (
                            <ErrorMessage message={tErr(state.errors.confirmPass.at(0))} />
                        )}
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-y-5 pb-5 w-full'>
                <SignUpButton btnText={t('signupBtn')} />

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

export default memo(SignUpForm)

function SignUpButton({ btnText }: { btnText: string }) {
    const { pending } = useFormStatus();

    return (
        <button disabled={pending} aria-disabled={pending} className='w-full bg-gray-800 text-white py-3 rounded-lg hover:opacity-80 disabled:opacity-80' type="submit">
            {btnText}
        </button>
    );
}