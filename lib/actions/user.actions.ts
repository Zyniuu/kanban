'use server'

export const signup = async (locale: string) => {
    //username, email, password, locale
    try {
        const res = await fetch('http://localhost:3000/api/users/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'test',
                email: 'test@gmail.com',
                passsword: '123456',
                locale: locale,
            }),
        });
        console.log(res);
    } catch (error) {
        throw error;
    }
}