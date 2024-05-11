import { unstable_setRequestLocale } from "next-intl/server"


const Home = ({ 
	params: { 
		locale 
	} 
}: {
	params: {
		locale: string
	}
}) => {
	unstable_setRequestLocale(locale);

	return (
		<h1>HOME</h1>
	)
}

export default Home