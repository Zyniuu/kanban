import SignUpForm from "@/components/forms/SignUpForm/SignUpForm";
import { unstable_setRequestLocale } from "next-intl/server";


type Props = {
    params: {
        locale: string,
    },
};

const SignUp = ({ params: { locale } }: Props) => {
    unstable_setRequestLocale(locale);

    return (
        <SignUpForm params={{ locale }} />
    )
}

export default SignUp