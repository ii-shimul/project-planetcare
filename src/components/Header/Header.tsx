
const Header = ({ title, subtitle }: { title: string; subtitle: string }) => {
	return (
		<div className="bg-green-700 text-white py-20 px-4 text-center">
			<h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
			<p className="mt-4 text-lg max-w-2xl mx-auto">{subtitle}</p>
		</div>
	);
};

export default Header;
