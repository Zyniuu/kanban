import SignInForm from "@/components/forms/SignInForm/SignInForm"


type Props = {
    params: {
        locale: string,
    },
}

const SignIn = ({ params: { locale } }: Props) => {
    return (
        <SignInForm params={{ locale }} />
    )
}

export default SignIn