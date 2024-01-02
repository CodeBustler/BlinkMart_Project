import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiShoppingCartFill } from "react-icons/ri";
import { IoMdSad } from "react-icons/io";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";

function Login() {
	const [errorMsg, setErrorMsg] = useState("");
	const navigate = useNavigate();
	const toastSuccess = () => toast.success("Login Success !");

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
					toastSuccess();
					setTimeout(() => {
						navigate("/");
						navigate(0);
					}, 1000);
				})
				.catch((error) =>
					console.log(error, setErrorMsg(error.message.slice(9))),
				);
		}
	};

	return (
		<section className="h-[100vh]">
			<ToastContainer
				position="bottom-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
			{/*CONTAINER*/}
			<div className="flex flex-col items-center pt-10">
				{/*LOGO*/}
				<Link className="font-bold flex items-center gap-1  ">
					<RiShoppingCartFill className=" text-3xl text-orange-400" />
					<span className="text-3xl">BlinkMart</span>
				</Link>
				{/*FORM*/}
				<form className="flex flex-col border py-8 px-8  w-[90%] md:w-[40%] lg:w-[32%] mt-10 rounded-lg shadow-2xl gap-2 ">
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
					<span className="text-red-500 font-semibold mt-2 flex items-center gap-2">
						{errorMsg.length > 0 && (
							<IoMdSad className="text-2xl animate-bounce" />
						)}
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
