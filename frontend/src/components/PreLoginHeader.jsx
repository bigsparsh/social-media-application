import { Link } from "react-router-dom";
const PreLoginHeader = () => {
	return (
		<>
			<nav className="flex justify-between items-center px-5 py-4 text-blue-100 bg-blue-900">
				<div className="logo-icon text-3xl">Social Media</div>
				<div className="links flex gap-5">
					<Link to="/signup">
						<div className="flex px-3 py-1 ring-1 ring-blue-700 bg-blue-800 rounded-lg gap-3 justify-center items-center">
							<i className="text-xl fa-solid fa-user-plus"></i>
							<p>Sign Up</p>
						</div>
					</Link>
					<Link to="/login">
						<div className="flex px-3 py-1 ring-1 ring-blue-700 bg-blue-800 rounded-lg gap-3 justify-center items-center">
							<i className="text-xl fa-solid fa-right-to-bracket"></i>
							<p>Log In</p>
						</div>
					</Link>
				</div>
			</nav>
		</>
	);
};
export default PreLoginHeader;
