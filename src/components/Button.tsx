import React from "react";

interface ButtonProps {
	label: string;
	callback: Function;
	full?: boolean;
}

const Button = ({ label, callback, full }: ButtonProps) => {
	/* Handlers ----------------------------------------------------------------------------------------------------------------------------------------------------------------*/

	const handleClick = () => {
		callback && callback();
	};

	/* Render ----------------------------------------------------------------------------------------------------------------------------------------------------------------*/

	return (
		<button
			className={`py-2 px-4 text-white bg-black my-2 rounded-md text-sm cursor-pointer hover:bg-gray-900 focus:bg-gray-800
      ${full && "w-full"}
      `}
			onClick={handleClick}
		>
			{label}
		</button>
	);
};

export default Button;
