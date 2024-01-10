"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useStore } from "../../store/store";
import Signup from "@/features/auth/signup/Signup";

const SignupPage = () => {
	const router = useRouter();
	const { user } = useStore((store) => store);

	useEffect(() => {
		if (user) {
			router.push("/");
		}
	}, [user]);

	return (
		<section className="w-full h-[calc(100vh-76px)] flex justify-center items-center">
			<Image
				src={"/login.png"}
				alt="Login Image"
				className="lg:inline hidden flex-1 w-1/2 h-[calc(100vh-76px)] overflow-hidden bg-black object-cover"
				height={100}
				width={100}
			/>

			<Signup/>
		</section>
	);
};

export default SignupPage;
