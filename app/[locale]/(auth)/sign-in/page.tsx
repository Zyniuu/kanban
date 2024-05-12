import SignInForm from "@/components/forms/SignInForm/SignInForm"
import { unstable_setRequestLocale } from "next-intl/server"


type Props = {
    params: {
        locale: string,
    },
}

const SignIn = ({ params: { locale } }: Props) => {
    unstable_setRequestLocale(locale);

    return (
        <SignInForm params={{ locale }} />
    )
}

export default SignIn