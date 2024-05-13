import SignInForm from "@/components/forms/SignInForm/SignInForm"
import { unstable_setRequestLocale } from "next-intl/server"
import { Suspense } from "react";


type Props = {
    params: {
        locale: string,
    },
}

const SignIn = ({ params: { locale } }: Props) => {
    unstable_setRequestLocale(locale);

    return (
        <Suspense>
            <SignInForm params={{ locale }} />
        </Suspense>
    )
}

export default SignIn