import React, { useRef, useState } from "react";
import axios from "axios";

const SignUp = () => {
	const username = useRef();
	const password = useRef();
	const email = useRef();
	const image = useRef();
	const errDialog = useRef();
	// const [log, setLog] = useState(false);
	const [msg, setMsg] = useState({});

	const sendData = () => {
		const userData = {
			email: email.current.value,
			password: password.current.value,
			username: username.current.value,
			image: image.current.value,
			// .files[0]
		};
		if (
			userData.email == "" ||
			userData.password == "" ||
			userData.username == "" ||
			userData.image == ""
		) {
			setMsg({
				response: {
					data: {
						error: "Some fields are not filled",
						solution: "Fill all the fields and then submit",
					},
				},
			});
			return;
		}
		const formData = new FormData();
		formData.append("username", userData.username);
		formData.append("email", userData.email);
		formData.append("password", userData.password);
		formData.append("profilePath", image.current.files[0]);
		axios
			.post(
				"http://localhost:3000/user/signup",
				// "https://social-media-1sol.onrender.com/user/signup",
				formData
			)
			.then((res) => {
				setMsg({
					response: {
						data: {
							// This is not really the error... it is sign up confirmation
							error: "=| Sign Up successfully |=",
							solution: "Now you can log in",
						},
					},
				});
				localStorage.setItem("authToken", res.data.authToken);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const closeDialog = () => {
		errDialog.current.close();
		setMsg({});
		email.current.value = "";
		password.current.value = "";
		username.current.value = "";
	};

	return (
		<div className=" px-10 grow flex flex-col justify-center items-center w-1/2 m-auto bg-blue-100 text-center text-blue-900">
			{Object.keys(msg).length != 0 && (
				<dialog
					className="w-fit top-36 text-center py-5 px-10 text-indigo-100 ring-1 ring-blue-500 shadow-xl bg-blue-800 rounded-lg tracking-normal font-medium"
					ref={errDialog}
					open
				>
					<i
						onClick={closeDialog}
						className="fa-solid fa-x absolute top-[-5px] right-[-5px] px-2 py-1 ring-4 ring-blue-800 font-bold rounded-full bg-blue-200 text-blue-900 cursor-pointer text-sm"
					></i>
					<div className="text">
						<h1 className="text-3xl leading-7">
							{msg.response.data.error}
						</h1>
						<p className="opacity-75">
							{msg.response.data.solution}
						</p>
					</div>
				</dialog>
			)}
			<h1 className="text-5xl font-bold">Sign Up Form</h1>
			<p className="text-md opacity-75">
				Enter valid credentials to create an account
			</p>
			<div className="w-1/2 text-lg mt-5 flex flex-col justify-evenly items-start gap-1">
				<label htmlFor="name">Name:</label>
				<input
					type="text"
					name="name"
					id="name"
					ref={username}
					className="w-full rounded-lg px-4 py-1 placeholder:text-blue-200 ring-1 focus:ring-4 outline-none ring-blue-200"
					placeholder="Enter your name"
					required
				/>
				<label htmlFor="email">Email-ID:</label>
				<input
					type="text"
					name="email"
					ref={email}
					id="email"
					className="w-full rounded-lg px-4 py-1 placeholder:text-blue-200 ring-1 focus:ring-4 outline-none ring-blue-200"
					placeholder="Enter your email address"
					required
				/>
				<label htmlFor="password">Password:</label>
				<input
					type="password"
					name="password"
					ref={password}
					id="password"
					className="w-full rounded-lg px-4 py-1 placeholder:text-blue-200 ring-1 focus:ring-4 outline-none ring-blue-200"
					placeholder="Enter your password"
					required
				/>
				<label htmlFor="image">Password:</label>
				<input
					type="file"
					name="image"
					ref={image}
					id="image"
					accept="image/*"
					className="w-full rounded-lg px-4 py-1 placeholder:text-blue-200 ring-1 focus:ring-4 outline-none ring-blue-200"
					placeholder="Give your profile image"
					required
				/>
				<button
					onClick={sendData}
					className="text-2xl rounded-xl text-blue-100 bg-blue-900 ring-1 ring-blue-500 shadow-lg active:shadow-none px-5 py-1  mt-4 self-center"
				>
					Register
				</button>
			</div>
		</div>
	);
};
export default SignUp;
