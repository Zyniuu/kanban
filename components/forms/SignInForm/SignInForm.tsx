import PassInput from "@/components/custom/PassInput/PassInput"
import TEInput from "@/components/custom/TEInput/TEInput"


type Props = {
    params: {
        locale: string,
    },
}

const SignInForm = ({ params: { locale } }: Props) => {
    return (
        <>
            <TEInput label="Username" placeholder="Enter your username" id="username" ariaDescribedBy="username error" type="text" />
            <PassInput label="Password" placeholder="Password" id="pass" ariaDescribedBy="pass error" />
        </>
    )
}

export default SignInForm