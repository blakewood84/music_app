import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useToast } from "@/components/ui/use-toast";
import useAuth from "./useAuth";
import { LoginFormInputs, loginSchema } from "@/zod";

function useLogin() {
	const { toast } = useToast();
	const { loginUser } = useAuth();
	const supabase = createClientComponentClient();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormInputs>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
		await handleLogin(data.email, data.password);
	};

	const handleLogin = async (email: string, password: string) => {
		if (!email || !password) return;

		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			toast({
				title: "An Error Occurred",
				description: error.message,
				variant: "destructive",
			});
			return;
		}

		loginUser(data?.user?.id);
	};

	return {
		register,
		handleSubmit,
		errors,
		onSubmit,
	};
}

export default useLogin;
