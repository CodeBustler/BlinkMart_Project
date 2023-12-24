import { Link } from "react-router-dom";
import { RiShoppingCartFill } from "react-icons/ri";

function SignUp() {
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
					/>
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
						Submit
					</button>
					<p className="mt-5">
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

{
	/*<div className=" w-[95%] md:w-[40%] border rounded p-3 px-10 ">
				<h2 className="my-3 text-2xl">Create Account</h2>

				<form action="" className="flex flex-col gap-1">
					<label htmlFor="name">Your Name</label>
					<input
						type="text"
						name="name"
						placeholder="First and last name"
					/>

					<label htmlFor="email">Email </label>
					<input
						type="email"
						name="email"
						placeholder="Enter email id"
					/>

					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						placeholder="At least 6 characters"
					/>
					<button
						type="submit"
						className="my-5 bg-yellow-400 py-2 rounded font-semibold "
					>
						Submit
					</button>
					<p className="">
						Aleady have an account ?{" "}
						<span className="font-semibold">Login</span>{" "}
					</p>
				</form>
			</div>*/
}
