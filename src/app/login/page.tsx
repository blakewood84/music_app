"use client";
import Button from "@/components/Button";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as users_actions from "@/store/actions/users-actions";
import { UnknownAction } from "redux";
import { RootState } from "@/store/store";

const Login = () => {
	/* Hooks ----------------------------------------------------------------------------------------------------------------------------------------------------------------*/

	const router = useRouter();
	const dispatch = useDispatch();
	const supabase = createClientComponentClient();
	const users = useSelector((store: RootState) => store.users);

	const [showLogin, setShowLogin] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	useEffect(() => {
		if (users.user) {
			router.push("/");
		}
	}, [users.user]);

	/* Handlers ----------------------------------------------------------------------------------------------------------------------------------------------------------------*/

	const handleLogin = async () => {
		if (!email || !password) return;

		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			alert(error.message);
			return;
		} else {
			dispatch(
				users_actions.loginUser(data?.user?.id, () => {
					router.push("/");
				}) as unknown as UnknownAction
			);
		}
	};

	const handleSignUp = async () => {
		if (!email || !password || !confirmPassword) return;
		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}

		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `/`,
			},
		});

		if (error) {
			// Handle Errors TODO: Imeplement toastr errors
			alert(error.message);
			return;
		} else {
			// Insert user into profile table
			const { error } = await supabase
				.from("Profile")
				.insert({ UID: data?.user?.id });
			if (error) {
				// Handler Errors
				alert(error.message);
				return;
			} else {
				router.push("/");
			}
		}
	};

	/* Render ----------------------------------------------------------------------------------------------------------------------------------------------------------------*/

	return (
		<section className="w-full h-[calc(100vh-76px)] flex justify-center items-center">
			<Image
				src={"/login.png"}
				alt="Login Image"
				className="lg:inline hidden flex-1 w-1/2 h-[calc(100vh-76px)] overflow-hidden bg-black object-cover"
				height={100}
				width={100}
			/>

			<div className="lg:mx-4 flex flex-1 flex-col justify-center items-center">
				<div className="flex flex-1 flex-col justify-center items-center max-w-xs w-full">
					<h2 className="font-semibold text-2xl">
						{showLogin ? "Log in" : "Create an account"}
					</h2>

					{!showLogin && (
						<p className="text-gray-400 text-sm mt-3">
							Enter your email below to create your account
						</p>
					)}

					<div className="mt-4 w-full">
						<input
							type="email"
							placeholder="name@example.com"
							className="w-full border-[1px] px-4 py-1 rounded-md shadow-sm"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="mt-4 w-full">
						<input
							type="password"
							placeholder="password"
							className="w-full border-[1px] px-4 py-1 rounded-md shadow-sm"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					{!showLogin && (
						<div className="mt-4 w-full">
							<input
								type="password"
								placeholder="confirm password"
								className="w-full border-[1px] px-4 py-1 rounded-md shadow-sm"
								value={confirmPassword}
								onChange={(e) =>
									setConfirmPassword(e.target.value)
								}
							/>
						</div>
					)}
					<div className="w-full mt-4">
						<Button
							label="Continue"
							callback={() =>
								showLogin ? handleLogin() : handleSignUp()
							}
							full
						/>
					</div>

					<p className="mt-4 text-sm text-gray-400 text-center px-8">
						{showLogin
							? "Don't have an account?"
							: "Already a user?"}
						&nbsp;
						<span
							className="underline cursor-pointer"
							onClick={() => setShowLogin(!showLogin)}
						>
							{showLogin ? "Sign up" : "Sign in"}
						</span>
					</p>
					<p className="mt-4 text-sm text-gray-400 text-center px-8">
						By clicking continue, you agree to our
						<span> Terms of Service </span>
						and
						<span> Privacy Policy</span>.
					</p>
				</div>
			</div>
		</section>
	);
};

export default Login;
