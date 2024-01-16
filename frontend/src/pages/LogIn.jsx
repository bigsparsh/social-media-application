import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const LogIn = () => {
	const password = useRef();
	const email = useRef();
	const errDialog = useRef();
	const [msg, setMsg] = useState({});
	const [log, setLog] = useState(false);

	useEffect(() => {
		const authToken = localStorage.getItem("authToken");
		if (!authToken) {
			return;
		}
		axios
			.post(
				// "http://localhost:3000/user/tokenlogin",
				// "https://social-media-1sol.onrender.com/user/tokenlogin",
				"https://social-media-application-5dap.vercel.app/user/tokenlogin",
				{},
				{
					headers: {
						authToken: authToken,
					},
					onUploadProgress: (progressEvent) =>
						console.log(
							Math.round(
								(progressEvent.loaded / progressEvent.total) *
									100
							) + "%"
						),
				}
			)
			.then((res) => {
				setMsg({
					response: {
						data: {
							error: "=| Logged in successfully |=",
							solution: "Redirecting to dashboard!",
						},
					},
				});
				setLog(true);
			})
			.catch((err) => {
				setMsg(err);
				console.log(err.response.data.error);
			});
	}, []);

	const sendData = () => {
		const userData = {
			email: email.current.value,
			password: password.current.value,
		};
		if (userData.email == "" || userData.password == "") {
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
		axios
			.post(
				// "http://localhost:3000/user/login",
				// "https://social-media-1sol.onrender.com/user/login",
				"https://social-media-application-5dap.vercel.app/user/login",
				userData
			)
			.then((res) => {
				setMsg({
					response: {
						data: {
							// This is not really the error... it is sign up confirmation
							error: "=| Log In sucessfull |=",
							solution: "Redirecting to the dashboard",
						},
					},
				});
				localStorage.setItem("authToken", res.data.authToken);
				setLog(true);
			})
			.catch((err) => {
				setMsg(err);
				console.log(err.response.data.error);
			});
	};
	const closeDialog = () => {
		errDialog.current.close();
		setMsg({});
		email.current.value = "";
		password.current.value = "";
	};
	return log ? (
		<Navigate to="/dashboard" state={{ isLogged: true }} />
	) : (
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
			<h1 className="text-5xl font-bold">Log In Form</h1>
			<p className="text-md opacity-75">
				Enter valid credentials to log into your account
			</p>
			<div className="w-1/2 text-lg mt-5 flex flex-col justify-evenly items-start gap-1">
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
				<button
					onClick={sendData}
					className="text-2xl rounded-xl text-blue-100 bg-blue-900 ring-1 ring-blue-500 shadow-lg active:shadow-none px-5 py-1  mt-4 self-center"
				>
					Log In
				</button>
			</div>
		</div>
	);
};
export default LogIn;
