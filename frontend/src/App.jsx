import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import ErrorPage from "./components/ErrorPage";
import Dashboard from "./pages/Dashboard";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainComp from "./components/MainComp";
import UserProfile from "./pages/UserProfile";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<MainComp loginState={false} />}>
					<Route path="/signup" element={<SignUp />} />
					<Route path="/login" element={<LogIn />} />
					<Route path="*" element={<ErrorPage />} />
				</Route>
				<Route element={<MainComp loginState={true} />}>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/profile/:userId" element={<UserProfile />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
