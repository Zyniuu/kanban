type Props = {
    title: string,
    description: string,
};

const AuthTitle = ({ title, description }: Props) => {
    return (
        <>
            <h1 className="text-[32px] font-bold text-gray-800 pb-2">{title}</h1>
            <p className="text-base text-gray-500">{description}</p>
        </>
    )
}

export default AuthTitle