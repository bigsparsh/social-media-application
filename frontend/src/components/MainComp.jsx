import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import React from "react";
import PostLoginHeader from "./PostLoginHeader";
import PreLoginHeader from "./PreLoginHeader";

const MainComp = ({ loginState }) => {
	return (
		<div className="w-screen h-screen overflow-x-hidden flex flex-col">
			{loginState ? <PostLoginHeader /> : <PreLoginHeader />}
			<Outlet />
			<Footer />
		</div>
	);
};
export default MainComp;
