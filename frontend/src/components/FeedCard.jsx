const FeedCard = ({ image, title, desc, timestamp, user }) => {
	return (
		<div className="friend-card flex flex-col bg-blue-100 ring-1 rounded-lg ring-blue-200 items-center overflow-hidden relative">
			<div
				className="img ring-1 rounded-t-lg bg-center bg-cover w-full aspect-video p-3 group"
				style={{
					backgroundImage: `url(uploads/${image})`,
				}}
			>
				<div className="group-hover:opacity-0 p-3 rounded-xl w-fit text-blue-950 bg-blue-100 flex gap-3 items-center ">
					<div
						className="rounded-lg bg-center bg-cover h-[50px] aspect-square ring-1 ring-blue-500"
						style={{
							backgroundImage: `url(uploads/${user.profilePath})`,
						}}
					></div>
					<div className="text">
						<h1 className="text-2xl leading-5 font-bold">
							{user.username}
						</h1>
						<p className="text-lg font-medium">{user.email}</p>
					</div>
				</div>
			</div>
			<div className="text px-7 py-5 text-start w-full bg-blue-50 text-blue-950">
				<h1 className="text-3xl font-bold">{title}</h1>
				<p className="opacity-75 text-xl leading-5">{desc}</p>
				<p className="text-sm opacity-75 py-3 font-medium">
					Posted at {timestamp}
				</p>
			</div>
		</div>
	);
};
export default FeedCard;
