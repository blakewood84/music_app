import { Button } from "@/components";
import Link from "next/link";
import useLogin from "@/hooks/useLogin";

const Login = () => {
	const { register, handleSubmit, errors, onSubmit } = useLogin();

	return (
		<div className="lg:mx-4 flex flex-1 flex-col justify-center items-center">
			<div className="flex flex-1 flex-col justify-center items-center max-w-xs w-full">
				<h2 className="font-semibold text-2xl">Log in</h2>

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

					<Button type="submit" label="Continue" full />
				</form>

				<p className="mt-4 text-sm text-gray-400 text-center px-8">
					Don't have an account?&nbsp;
					<Link href="/signup" className="underline">
						Sign Up
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

export default Login;
