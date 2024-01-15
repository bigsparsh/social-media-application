const FeedSuspense = () => {
	return (
		<div className="friend-card flex flex-col bg-blue-100 ring-1 rounded-lg ring-blue-200 overflow-hidden items-center relative">
			<div className="img ring-1 rounded-lg bg-center bg-cover w-full aspect-video bg-white">
				<div className="p-3 rounded-br-xl rounded-tl-lg w-fit text-blue-50 bg-blue-950/50 flex gap-3 items-center ">
					<div className="bg-center bg-cover h-[50px] aspect-square bg-white animate-pulse rounded-lg"></div>
					<div className="text space-y-2">
						<h1 className="text-2xl leading-5 w-24 h-4 bg-white animate-pulse rounded-full"></h1>
						<p className="text-lg h-3 w-52 bg-white animate-pulse rounded-full opacity-75"></p>
					</div>
				</div>
			</div>
			<div className="text px-7 py-5 text-start w-full space-y-3 bg-blue-950/50">
				<h1 className="text-3xl font-bold w-full h-5 bg-white animate-pulse rounded-full"></h1>
				<p className="opacity-75 text-xl leading-5 w-full h-10 bg-white animate-pulse rounded-full"></p>
				<p className="text-sm opacity-75 h-3 w-1/2 bg-white animate-pulse rounded-full"></p>
			</div>
		</div>
	);
};
export default FeedSuspense;
