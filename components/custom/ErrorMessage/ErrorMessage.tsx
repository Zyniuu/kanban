import { memo } from "react";

const ErrorMessage = ({ message }: { message: string | undefined }) => {
    return (
        <>
            {message ? (
                <p className="mt-2 text-sm text-red-500">
                    {message}
                </p>
            ) : null}
        </>
    );
}

export default memo(ErrorMessage)