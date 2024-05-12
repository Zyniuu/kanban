import SignUpForm from "@/components/forms/SignUpForm/SignUpForm";
import { signup } from "@/lib/actions/user.actions";
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