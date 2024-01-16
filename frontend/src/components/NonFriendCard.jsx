import axios from "axios";
import { useNavigate } from "react-router-dom";

const NonFriendCard = ({ name, email, profile, id, update }) => {
	const navigate = useNavigate();
	const makeFriend = () => {
		const authToken = localStorage.getItem("authToken");
		axios
			.post(
				// "http://localhost:3000/friend/create",
				// "https://social-media-1sol.onrender.com/friend/create",
				"https://social-media-application-5dap.vercel.app/friend/create",
				{ friendId: id },
				{
					headers: {
						authToken: authToken,
					},
				}
			)
			.then((res) => {
				update();
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div className="friend-card flex gap-3 p-3 bg-blue-100 ring-1 rounded-lg ring-blue-200 items-center relative">
			<i
				className="fa-solid fa-plus absolute top-[-6px] right-[-6px] px-2 py-1 font-bold rounded-full bg-blue-800 text-blue-100 cursor-pointer text-sm"
				onClick={makeFriend}
			></i>
			<div
				className="img ring-1 rounded-lg bg-center bg-cover h-[50px] aspect-square"
				onClick={() => {
					navigate(`/profile/${id}`);
				}}
				style={{
					backgroundImage: `url(uploads/${profile})`,
				}}
			></div>
			<div className="text">
				<h1 className="text-2xl font-bold leading-5">{name}</h1>
				<p className="opacity-75">{email}</p>
			</div>
		</div>
	);
};
export default NonFriendCard;
