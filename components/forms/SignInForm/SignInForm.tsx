'use client'

import AuthTitle from "@/components/custom/AuthTitle/AuthTitle"
import ErrorMessage from "@/components/custom/ErrorMessage/ErrorMessage"
import KanbanLogo from "@/components/custom/KanbanLogo/KanbanLogo"
import PassInput from "@/components/custom/PassInput/PassInput"
import SuccessToast from "@/components/custom/SuccessToast/SuccessToast"
import TEInput from "@/components/custom/TEInput/TEInput"
import { signinValidate } from "@/lib/actions/SignIn/signin.action"
import { SignInState } from "@/lib/types/validation.types"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, memo, Suspense, useState } from "react"


type Props = {
    params: {
        locale: string,
    },
}

const SignInForm = ({ params: { locale } }: Props) => {
    const t = useTranslations('Forms');
    const tErr = useTranslations('FormErrors');
    const router = useRouter();
    const [state, setState] = useState<SignInState>({ errors: {} });
    const [isLoading, setIsLoading] = useState(false);

    const onSubmithandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        const formData = new FormData(event.currentTarget);
        const validation = await signinValidate(formData);
        setState(validation);
        if (validation.errors?.email || validation.errors?.pass) {
            setIsLoading(false);
            return;
        }
        
        try {
            const res = await fetch('/api/users/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.get('email'),
                    password: formData.get('pass'),
                }),
            });

            switch(res.status) {
                case 201:
                    const data = await res.json();
                    router.push(`/${data.data.locale}/kanban`);
                    break;
                case 400:
                    setState({
                        errors: {
                            pass: ['invalidCredentialsError'],
                        }
                    });
                    break;
                case 500:
                    setState({
                        errors: {
                            pass: ['internalError'],
                        }
                    })
                    break;
            }

        } catch (error) {
            setState({
                errors: {
                    pass: ['internalError'],
                }
            })
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={onSubmithandler} className='flex flex-col gap-y-10 h-full w-full'>
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
            </div>
            <div className='flex flex-col gap-y-5 pb-5 w-full'>
               {/* <SignInButton btnText={t('signin')} /> */}
                <button disabled={isLoading} aria-disabled={isLoading} className='w-full bg-gray-800 text-white py-3 rounded-lg hover:opacity-80 disabled:opacity-80'>
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
            <Suspense>
                <SuccessToast />
            </Suspense>
        </form>
    )
}

export default memo(SignInForm)