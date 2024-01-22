import Link from "next/link";
import { Button as UIButton } from "./ui/button";

interface ButtonProps {
	label: string;
	callback?: Function;
	full?: boolean;
	href?: string;
	type?: "submit";
}

export const Button = ({ label, callback, full, href, type }: ButtonProps) => {
	return (
		<UIButton
			type={type}
			className={`my-2 ${full && "w-full"}`}
			size="sm"
			onClick={callback && (() => callback())}
		>
			{href ? <Link href={href}>{label}</Link> : label}
		</UIButton>
	);
};
