const Post = ({ title, desc, image }) => {
	return (
		<div>
			<div
				className="img bg-center bg-cover aspect-square rounded-lg"
				style={{ backgroundImage: `url(/uploads/${image})` }}
			></div>
		</div>
	);
};
export default Post;
