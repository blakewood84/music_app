import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useStore } from "@/store/store";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "./useAuth";
import { SignupFormInputs, signupSchema } from "@/zod";

function useSignup() {
	const router = useRouter();
	const { loginUser, signupUser } = useAuth();
	const { user } = useStore((store) => store);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignupFormInputs>({
		resolver: zodResolver(signupSchema),
	});

	useEffect(() => {
		if (user) {
			router.push("/");
		}
	}, [user]);

	const onSubmit: SubmitHandler<SignupFormInputs> = (data) => {
		handleSignup(data.email, data.password, data.username);
	};

	const handleSignup = async (
		email: string,
		password: string,
		username: string
	) => {
		if (!email || !password) return;

		signupUser({ email, password, username }, (id) => {
			loginUser(id, () => {
				router.push("/");
			});
		});
	};

	return {
		register,
		handleSubmit,
		handleSignup,
		onSubmit,
		errors,
	};
}

export default useSignup;
