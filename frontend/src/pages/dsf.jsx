import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
	const { userId } = useParams();
	const [user, setUser] = useState({});

	useEffect(() => {
		axios
			.post("http://localhost:3000/user/profile", {
				userId: userId,
			})
			.then((res) => {
				setUser(res.data.user);
				console.log(res.data.user);
			});
	}, [userId]);

	return (
		<div className="grow bg-blue-50 grid place-items-center px-52 py-24">
			<div className="profile-card w-full h-full bg-white rounded-xl ring-1 shadow-xl ring-gray-200 p-10">
				<div className="container flex gap-5 items-center">
					<div
						className="w-52 aspect-square bg-center bg-cover rounded-xl shadow-lg"
						style={{
							backgroundImage: `url(/uploads/${user.profilePath})`,
						}}
					></div>
					<div className="text">
						<h1 className="text-7xl font-bold">{user.username}</h1>
						<p className="text-xl opacity-75">{user.email}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
