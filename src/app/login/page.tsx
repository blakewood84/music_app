"use client";
import Button from "@/components/Button";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "../store";

const Login = () => {
	/* Hooks ----------------------------------------------------------------------------------------------------------------------------------------------------------------*/

	const router = useRouter();
	const supabase = createClientComponentClient();
	const { user, loginUser, signupUser } = useStore((store) => store);

	const [showLogin, setShowLogin] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [username, setUsername] = useState("");

	/* Effects ----------------------------------------------------------------------------------------------------------------------------------------------------------------*/

	useEffect(() => {
		if (user) {
			router.push("/");
		}
	}, [user]);

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
			loginUser(data?.user?.id, () => {
				router.push("/");
			});
		}
	};

	const handleSignUp = async () => {
		if (!email || !password || !confirmPassword) return;
		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}

		signupUser({ email, password, username }, (id) => {
			loginUser(id, () => {
				router.push("/");
			});
		});
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
					{!showLogin && (
						<div className="mt-4 w-full">
							<input
								placeholder="username"
								className="w-full border-[1px] px-4 py-1 rounded-md shadow-sm"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
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
