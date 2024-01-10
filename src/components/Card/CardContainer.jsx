import React from "react";

function CardContainer({ categoryTitle, children }) {
	return (
		<div className="bg-gray-100  border border-gray-300 rounded p-4 md:p-7 flex flex-col gap-5 overflow-x-auto shadow mt-8">
			<h1 className="text-2xl font-semibold text-center md:text-left md:sticky left-0 ">
				{categoryTitle}
			</h1>
			<div className="flex flex-col md:flex-row gap-5  ">{children}</div>
		</div>
	);
}

export default CardContainer;
