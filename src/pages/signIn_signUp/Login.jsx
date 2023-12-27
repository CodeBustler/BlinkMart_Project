import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiShoppingCartFill } from "react-icons/ri";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { MyContext } from "../../App";

function Login() {
	const navigate = useNavigate();
	const [errorMsg, setErrorMsg] = useState("");
	const { userName, setUserName } = useContext(MyContext);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				setUserName(user.displayName);
				console.log("UserName :" + user.displayName);
			} else {
				setUserName(null);
				console.log("User not logged in");
			}
		});

		return () => unsubscribe();
	}, []);

	// Input Values
	const [values, setValues] = useState({
		email: "",
		password: "",
	});

	// Handle Submit
	const handleSubmit = (e) => {
		e.preventDefault();

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!values.email || !values.password) {
			setErrorMsg("Please fill all fields");
		} else if (!emailRegex.test(values.email)) {
			setErrorMsg("Please enter a valid email address");
		} else {
			setErrorMsg("");
			signInWithEmailAndPassword(auth, values.email, values.password)
				.then((res) => {
					navigate("/");
				})
				.catch((error) =>
					console.log(error, setErrorMsg(error.message.slice(9))),
				);
		}
	};

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
						value={values.email}
						onChange={(event) =>
							setValues((prev) => ({
								...prev,
								email: event.target.value,
							}))
						}
					/>
					<input
						type="password"
						placeholder="Password"
						className="border py-2 px-3 mt-2 rounded-lg outline-blue-300"
						value={values.password}
						onChange={(event) =>
							setValues((prev) => ({
								...prev,
								password: event.target.value,
							}))
						}
					/>
					<button
						className="bg-yellow-400 p-2 mt-3 rounded-lg outline-blue-300 hover:bg-yellow-500 active:bg-yellow-400"
						onClick={(e) => handleSubmit(e)}
					>
						Login
					</button>
					{/*Error Message*/}
					<span className="text-red-500 font-semibold mt-2 ">
						{errorMsg}
					</span>
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
