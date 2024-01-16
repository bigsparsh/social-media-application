import { Suspense, lazy, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

import axios from "axios";

import NonFriendCard from "../components/NonFriendCard";
import FriendCard from "../components/FriendCard";

import Post from "../components/Post";
import UploadPost from "../components/UploadPost";

const FeedCard = lazy(() => import("../components/FeedCard"));
import FeedSuspense from "../components/FeedSuspense";

const Dashboard = () => {
	const location = useLocation();
	var logged = location.state?.isLogged || "";

	const [nonFriendUsers, setNonFriendUsers] = useState([]);
	const [friendUsers, setFriendUsers] = useState([]);
	const [feed, setFeed] = useState([]);
	const [post, setPost] = useState([]);
	const [updateUsers, setUpdateUsers] = useState(true);
	const [updateContent, setUpdateContent] = useState(true);
	const updateUserList = () => {
		setUpdateUsers((ele) => !ele);
	};
	const updateContentList = () => {
		setUpdateContent((ele) => !ele);
	};
	if (logged != "") {
		const authToken = localStorage.getItem("authToken");
		useEffect(() => {
			axios
				.post(
					// "http://localhost:3000/user/tokenlogin",
					// "https://social-media-1sol.onrender.com/user/tokenlogin",
					"https://social-media-application-5dap.vercel.app/user/tokenlogin",
					null,
					{
						headers: {
							authToken: authToken,
						},
					}
				)
				.then((res) => {})
				.catch((err) => {
					console.log(err);
				});
		}, []);
		useEffect(() => {
			axios
				.post(
					// "http://localhost:3000/user/getallfriend",
					// "https://social-media-1sol.onrender.com/user/getallfriend",
					"https://social-media-application-5dap.vercel.app/user/getallfriend",

					null,
					{
						headers: {
							authToken: authToken,
						},
					}
				)
				.then((res) => {
					setNonFriendUsers(res.data.nonFriend);
					setFriendUsers(res.data.friend);
				})
				.catch((err) => {
					console.log(err);
				});
		}, [updateUsers]);

		useEffect(() => {
			axios
				.post(
					// "http://localhost:3000/feed/getall",
					// "https://social-media-1sol.onrender.com/feed/getall",
					"https://social-media-application-5dap.vercel.app/feed/getall",
					null,
					{
						headers: {
							authToken: authToken,
						},
					}
				)
				.then((res) => {
					setFeed(res.data.feed);
					setPost(res.data.post);

					console.log(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}, [updateContent]);
	}

	return logged == "" ? (
		<Navigate to="/login" />
	) : (
		<div className="grow flex gap-5 p-5  text-blue-950">
			<div className="left-sec basis-1/4 p-5 bg-blue-50 rounded-xl h-fit sticky top-10">
				<h1 className="text-4xl font-medium tracking-tight font-serif ">
					Make new friends
				</h1>
				<div className="friend-cards flex flex-col gap-3 py-7">
					{nonFriendUsers.map((ele) => {
						return (
							<NonFriendCard
								name={ele.username}
								email={ele.email}
								profile={ele.profilePath}
								key={ele._id}
								id={ele._id}
								update={updateUserList}
							/>
						);
					})}
				</div>
				<h1 className="text-4xl font-medium tracking-tight font-serif ">
					Your friends
				</h1>
				<div className="friend-cards flex flex-col gap-3 py-7">
					{friendUsers.map((ele) => {
						return (
							<FriendCard
								name={ele.username}
								email={ele.email}
								profile={ele.profilePath}
								key={ele._id}
								id={ele._id}
								update={updateUserList}
							/>
						);
					})}
				</div>
			</div>
			<div className="middle-sec basis-1/2 p-5 bg-white ">
				<h1 className="text-4xl font-medium tracking-tight font-serif ">
					Your Feed
				</h1>
				<div className="feed-cards flex flex-col gap-3 py-7">
					{feed.map((ele, index) => {
						return (
							<Suspense
								fallback={<FeedSuspense />}
								key={`${ele._id}_${index}`}
							>
								<FeedCard
									image={ele.image}
									title={ele.title}
									desc={ele.desc}
									key={ele._id}
									timestamp={ele.timestamp}
									user={ele.user}
									id={ele._id}
								/>
							</Suspense>
						);
					})}
				</div>
			</div>
			<div className="right-sec basis-1/4 p-5 bg-blue-50 rounded-xl h-fit sticky top-10">
				<h1 className="text-4xl font-medium tracking-tight font-serif ">
					Upload post
				</h1>
				<UploadPost update={updateContentList} />
				<h1 className="text-4xl font-medium tracking-tight font-serif ">
					Your posts
				</h1>
				<div className="my-7 grid grid-cols-2 gap-3">
					{post.map((ele) => {
						return (
							<Post
								title={ele.title}
								desc={ele.desc}
								image={ele.image}
								key={ele._id}
								id={ele._id}
								update={updateContentList}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};
export default Dashboard;
