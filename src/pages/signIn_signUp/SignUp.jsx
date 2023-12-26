import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { RiShoppingCartFill } from "react-icons/ri";
import { useState } from "react";
import { auth } from "../../firebase";

function SignUp() {
	// Input Values
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	// Form Error Message
	const [errorMsg, setErrorMsg] = useState("");

	// Handle Submit
	const handleSubmit = (e) => {
		e.preventDefault();

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!values.name || !values.email || !values.password) {
			setErrorMsg("Please fill all fields");
		} else if (!emailRegex.test(values.email)) {
			setErrorMsg("Please enter a valid email address");
		} else {
			setErrorMsg("");
			createUserWithEmailAndPassword(auth, values.email, values.password)
				.then(async (res) => {
					const user = res.user;
					await updateProfile(user, {
						displayName: values.name,
					});
					console.log(res);
					navigate("/login");
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
					<h1 className="text-2xl font-semibold">Create Account</h1>
					<input
						type="text"
						placeholder="Full name"
						className="border py-2 px-3 mt-2 rounded-lg  outline-blue-300"
						required
						onChange={(event) =>
							setValues((prev) => ({
								...prev,
								name: event.target.value,
							}))
						}
					/>
					<input
						type="email"
						placeholder="Email Id"
						className="border py-2 px-3 mt-2 rounded-lg  outline-blue-300"
						required
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
						required
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
						Submit
					</button>

					<span className="text-red-500 font-semibold mt-2 ">
						{errorMsg}
					</span>
					<p className="mt-2">
						Already have an account?
						<Link
							to="/login"
							className="font-semibold text-orange-500 ml-1"
						>
							Sign In
						</Link>
					</p>
				</form>
			</div>
		</section>
	);
}

export default SignUp;
