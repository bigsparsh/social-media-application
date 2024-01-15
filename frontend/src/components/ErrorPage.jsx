const ErrorPage = () => {
	return (
		<div className="w-screen h-screen grid place-items-center">
			<div className="text-center">
				<h1 className="text-red-500 font-bold text-5xl">
					404 not found
				</h1>
				<p className="text-red-500 opacity-50">
					The URL enpoint doesn't lead anywhere
				</p>
			</div>
		</div>
	);
};
export default ErrorPage;
