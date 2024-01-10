"use client";
import Link from "next/link";
import { Button } from "@/components";
import { NAV_LINKS } from "@/constants";
import { useEffect } from "react";
import { useStore } from "@/store/store";
import useAuth from "@/hooks/useAuth";

export const Nav = () => {
	const { loginUser, isUserLoggedIn, logoutUser } = useAuth();
	const { user } = useStore((store) => store);

	useEffect(() => {
		if (!user) {
			isUserLoggedIn().then((id) => {
				if (id) {
					loginUser(id);
				}
			});
		}
	}, []);

	const handleLogout = async () => {
		logoutUser();
	};

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
					<Button label="Log In" href={"/login"} />
				)}
			</div>
		</nav>
	);
};
