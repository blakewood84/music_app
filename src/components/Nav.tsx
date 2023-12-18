"use client";
import Link from "next/link";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { NAV_LINKS } from "@/constants";
import { useEffect } from "react";
import { useStore } from "@/app/store";
const toastr = require("toastr");

const Nav = () => {
	/* Hooks ----------------------------------------------------------------------------------------------------------------------------------------------------------------*/

	const router = useRouter();
	const { user, logoutUser, loginUser, isUserLoggedIn } = useStore(
		(store) => store
	);

	useEffect(() => {
		if (!user) {
			isUserLoggedIn().then((id) => {
				if (id) {
					loginUser(id);
				}
			});
		}
	}, []);

	/* Handlers ----------------------------------------------------------------------------------------------------------------------------------------------------------------*/

	const handleLogin = () => {
		router.push("/login");
	};

	const handleLogout = async () => {
		logoutUser();
	};

	/* Render ----------------------------------------------------------------------------------------------------------------------------------------------------------------*/

	return (
		<nav className="flex justify-between items-center px-2">
			{/* -- Logo -- */}
			<div>
				<Link href={"/"}>Logo</Link>
			</div>

			{/* -- Nav Links -- */}
			<ul className="flex justify-center gap-16">
				{NAV_LINKS.map((link) => (
					<Link
						href={link.href}
						className="cursor-pointer"
						key={link.key}
					>
						{link.label}
					</Link>
				))}
			</ul>

			{/* -- Auth -- */}
			<div>
				{user ? (
					<Button label="Log Out" callback={handleLogout} />
				) : (
					<Button label="Log In" callback={handleLogin} />
				)}
			</div>
		</nav>
	);
};

export default Nav;
