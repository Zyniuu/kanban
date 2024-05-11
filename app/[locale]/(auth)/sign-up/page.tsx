import SignUpForm from "@/components/forms/SignUpForm/SignUpForm";


type Props = {
    params: {
        locale: string,
    },
};

const SignUp = ({ params: { locale } }: Props) => {
    return (
        <SignUpForm params={{ locale }} />
    )
}

export default SignUp