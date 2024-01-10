import { Button } from "@/components";
import Link from "next/link";
import useSignup from "@/hooks/useSignup";

const Signup = () => {
	const { register, handleSubmit, onSubmit, errors } = useSignup();

	return (
		<div className="lg:mx-4 flex flex-1 flex-col justify-center items-center">
			<div className="flex flex-1 flex-col justify-center items-center max-w-xs w-full">
				<h2 className="font-semibold text-2xl">Create an account</h2>

				<p className="text-gray-400 text-sm mt-3">
					Enter your email below to create your account
				</p>

				<form className="w-full" onSubmit={handleSubmit(onSubmit)}>
					<div className="mt-4 w-full">
						<input
							type="email"
							placeholder="name@example.com"
							className={`w-full border-[1px] px-4 py-1 rounded-md shadow-sm ${
								errors.email && "border-red-500"
							}`}
							{...register("email")}
						/>
						<div className="text-red-500 text-xs">
							{errors.email && <p>{errors.email.message}</p>}
						</div>
					</div>

					<div className="mt-4 w-full">
						<input
							type="password"
							{...register("password")}
							className={`w-full border-[1px] px-4 py-1 rounded-md shadow-sm ${
								errors.password && "border-red-500"
							}`}
							placeholder="Password"
						/>
						<div className="text-red-500 text-xs">
							{errors.password && (
								<p>{errors.password.message}</p>
							)}
						</div>
					</div>

					<div className="mt-4 w-full">
						<input
							type="password"
							{...register("confirmPassword")}
							className={`w-full border-[1px] px-4 py-1 rounded-md shadow-sm ${
								errors.confirmPassword && "border-red-500"
							}`}
							placeholder="Confirm Password"
						/>
						<div className="text-red-500 text-xs">
							{errors.confirmPassword && (
								<p>{errors.confirmPassword.message}</p>
							)}
						</div>
					</div>
					<div className="mt-4 w-full">
						<input
							{...register("username")}
							className={`w-full border-[1px] px-4 py-1 rounded-md shadow-sm ${
								errors.username && "border-red-500"
							}`}
							placeholder="Username"
						/>
						<div className="text-red-500 text-xs">
							{errors.username && (
								<p>{errors.username.message}</p>
							)}
						</div>
					</div>

					<Button type="submit" label="Continue" full />
				</form>

				<p className="mt-4 text-sm text-gray-400 text-center px-8">
					Already a user?&nbsp;
					<Link href="/login" className="underline">
						Sign in
					</Link>
				</p>
				<p className="mt-4 text-sm text-gray-400 text-center px-8">
					By clicking continue, you agree to our
					<span> Terms of Service </span>
					and
					<span> Privacy Policy</span>.
				</p>
			</div>
		</div>
	);
};

export default Signup;
