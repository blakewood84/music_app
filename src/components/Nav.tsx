"use client";
import Link from "next/link";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { NAV_LINKS } from "@/constants";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import * as users_actions from "@/store/actions/users-actions";
import { UnknownAction } from "redux";
import { useEffect } from "react";

const Nav = () => {
	/* Hooks ----------------------------------------------------------------------------------------------------------------------------------------------------------------*/

	const router = useRouter();
	const dispatch = useDispatch();
	const supabase = createClientComponentClient();
	const users = useSelector((store: RootState) => store.users);

	useEffect(() => {
		if (!users.user) {
			supabase.auth.getUser().then(({ data, error }) => {
				if (data?.user) {
					dispatch(
						users_actions.loginUser(data.user.id, () => {
							router.refresh();
						}) as unknown as UnknownAction
					);
				}
			});
		}
	}, []);

	/* Handlers ----------------------------------------------------------------------------------------------------------------------------------------------------------------*/

	const handleLogin = () => {
		router.push("/login");
	};

	const handleLogout = async () => {
		dispatch(
			users_actions.logoutUser(() => {
				router.push("/");
			}) as unknown as UnknownAction
		);
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
				{users.user ? (
					<Button label="Log Out" callback={handleLogout} />
				) : (
					<Button label="Log In" callback={handleLogin} />
				)}
			</div>
		</nav>
	);
};

export default Nav;
