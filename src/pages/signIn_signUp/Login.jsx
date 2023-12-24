import React from "react";
import { Link } from "react-router-dom";
import { RiShoppingCartFill } from "react-icons/ri";

function Login() {
	return (
		<section className="h-[100vh]">
			{/*CONTAINER*/}
			<div className="flex flex-col items-center pt-10">
				{/*LOGO*/}
				<Link className="font-bold flex items-center gap-1  ">
					<RiShoppingCartFill className=" text-3xl text-orange-400" />
					<span className="text-3xl">BlinkMart</span>
				</Link>
				{/*FORM*/}
				<form
					action=""
					className="flex flex-col border py-8 px-8  w-[90%] md:w-[40%] lg:w-[32%] mt-10 rounded-lg shadow-2xl gap-2 "
				>
					<h1 className="text-2xl font-semibold">Login</h1>

					<input
						type="email"
						placeholder="Email Id"
						className="border py-2 px-3 mt-2 rounded-lg  outline-blue-300"
					/>
					<input
						type="password"
						placeholder="Password"
						className="border py-2 px-3 mt-2 rounded-lg outline-blue-300"
					/>
					<button className="bg-yellow-400 p-2 mt-3 rounded-lg outline-blue-300 hover:bg-yellow-500 active:bg-yellow-400">
						Login
					</button>
					<p className="mt-5">
						New to BlinkMart?
						<Link
							to="/signup"
							className="font-semibold text-orange-500 ml-2"
						>
							Create account
						</Link>
					</p>
				</form>
			</div>
		</section>
	);
}

export default Login;
