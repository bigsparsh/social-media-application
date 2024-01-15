import axios from "axios";
import { useRef, useState } from "react";

const UploadPost = ({ update }) => {
	const image = useRef();
	const title = useRef();
	const desc = useRef();
	const sendData = () => {
		const formData = new FormData();
		formData.append("title", title.current.value);
		formData.append("desc", desc.current.value);
		formData.append("image", image.current.files[0]);

		axios
			.post(
				// "http://localhost:3000/feed/create",
				"https://social-media-1sol.onrender.com/feed/create",
				formData,
				{
					headers: {
						authToken: localStorage.getItem("authToken"),
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
		<div className="form my-7 p-5 rounded-lg bg-blue-100 ring-1 w-full aspect-video grid place-items-center  ring-blue-200">
			<input
				type="file"
				className="block w-full file:w-full file:cursor-pointer text-sm text-blue-900
						file:mr-4 file:py-2 file:px-4
						file:rounded-full file:border-0
						file:text-sm file:font-semibold
						file:bg-blue-50 file:text-blue-700
						hover:file:bg-blue-200"
				accept="image/*"
				ref={image}
			/>
			<input
				type="text"
				placeholder="Give the title"
				className="w-full px-5 py-1 rounded-lg bg-blue-50 ring-1 ring-blue-200"
				ref={title}
			/>
			<input
				type="text"
				placeholder="Give the description"
				className="w-full px-5 py-1 rounded-lg bg-blue-50 ring-1 ring-blue-200"
				ref={desc}
			/>
			<button
				onClick={sendData}
				className="bg-blue-900 shadow-xl px-5 py-1 rounded-full text-blue-50 text-xl font-semibold"
			>
				Post
			</button>
		</div>
	);
};
export default UploadPost;
