import React from "react";
import { Link } from "react-router-dom";

function CardContainer({ categoryTitle, children }) {
	return (
		<div className="bg-gray-100  border border-gray-300 rounded p-4 md:p-6 flex flex-col gap-5 overflow-x-auto shadow mt-5">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-semibold text-center md:text-left md:sticky left-0 capitalize ">
					{categoryTitle.replace(/_/g, " ")}
				</h1>
				<Link className="text-blue-400 underline underline-offset-2 hidden md:block">
					See more...
				</Link>
			</div>
			<div className="flex flex-col md:flex-row gap-5  ">{children}</div>
		</div>
	);
}

export default CardContainer;
