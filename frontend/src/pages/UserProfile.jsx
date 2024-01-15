import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../components/Post";

const UserProfile = () => {
	const { userId } = useParams();
	const [user, setUser] = useState({});
	const [post, setPost] = useState([]);
	useEffect(() => {
		axios
			.post(
				// "http://localhost:3000/user/profile",
				"https://social-media-1sol.onrender.com/user/profile",
				{
					userId: userId,
				}
			)
			.then((res) => {
				setUser(res.data.user);
			});
	}, []);
	useEffect(() => {
		axios
			.post(
				// "http://localhost:3000/feed/profile",
				"https://social-media-1sol.onrender.com/feed/profile",
				{
					userId: userId,
				}
			)
			.then((res) => {
				setPost(res.data.post);
			});
	}, []);
	return (
		<div className="grow bg-blue-50 grid place-items-center px-96 py-24">
			<div className="profile-card w-full h-full bg-white rounded-xl ring-1 shadow-xl ring-blue-200 pt-10">
				<div className="container flex gap-10 items-start px-10">
					<div
						className="w-44 aspect-square bg-center bg-cover rounded-xl shadow-lg"
						style={{
							backgroundImage: `url(/uploads/${user.profilePath})`,
						}}
					></div>
					<div className="text-blue-900">
						<h1 className="text-7xl font-bold font-serif">
							{user.username}
						</h1>
						<p className="text-xl opacity-75">{user.email}</p>
						<div className="info flex bg-blue-900 font-semibold text-blue-50 px-4 py-1 text-lg rounded-lg w-fit my-2">
							Posts {post.length}
						</div>
					</div>
				</div>
				<h1 className="text-5xl font-medium tracking-tight font-serif bg-blue-900 w-full mt-10 px-10 py-2 text-blue-50">
					Posts
				</h1>
				<div className="grid grid-cols-5 gap-4 px-16 py-10">
					{post.map((ele) => (
						<Post
							title={ele.title}
							desc={ele.desc}
							image={ele.image}
							key={ele._id}
							id={ele._id}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
export default UserProfile;
