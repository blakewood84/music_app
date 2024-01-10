import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "@/components/ui/use-toast";
import { useStore } from "@/store/store";

function useAuth() {
	const { setUser } = useStore((store) => store);

	const loginUser = async (uuid: string, callback?: () => void) => {
		const supabase = createClientComponentClient();

		// Query the table for rows where the uuid column matches the provided uuid
		const { data, error } = await supabase
			.from("Profile")
			.select("*") // Selects all columns
			.eq("UID", uuid); // Filters rows where the UID column matches the provided uuid

		if (error) {
			// Handle the error appropriately
			console.error("Error fetching data:", error);
		} else {
			// Dispatch the action with the fetched data
			setUser(data[0]);
			toast({
				title: "Sucessfully Logged In",
				description: "You have been logged in",
			});
			if (callback) callback();
		}
	};

	const signupUser = async (
		user: { email: string; password: string; username: string },
		callback: (user: string) => void
	) => {
		const supabase = createClientComponentClient();

		// Check if username is taken
		const profileData = await supabase
			.from("Profile")
			.select("*")
			.eq("username", user.username);
		if (profileData?.data?.length) {
			toast({
				title: "An Error Occured",
				description: "Username is already taken",
				variant: "destructive",
			});
			return;
		}

		// Sign up the user
		const { data, error } = await supabase.auth.signUp({
			email: user.email,
			password: user.password,
			options: {
				emailRedirectTo: `/`,
			},
		});

		if (error) {
			toast({
				title: "An Error Occured",
				description: error.message,
				variant: "destructive",
			});
			return;
		} else {
			// Insert user into profile table
			const { error } = await supabase
				.from("Profile")
				.insert({ UID: data?.user?.id, username: user.username });

			if (error) {
				// Handler Errors
				toast({
					title: "An Error Occured",
					description: error.message,
					variant: "destructive",
				});
				return;
			} else {
				if (data?.user?.id) callback(data?.user?.id);
			}
		}
	};

	const isUserLoggedIn = async () => {
		const supabase = createClientComponentClient();

		const { data, error } = await supabase.auth.getUser();

		if (data?.user) {
			return data.user.id;
		} else {
			return;
		}
	};

	const logoutUser = async () => {
		const supabase = createClientComponentClient();

		const { error } = await supabase.auth.signOut();

		if (error) {
			// Handle the error appropriately
			console.error("Error signing out user:", error);
		} else {
			// Clear user
			setUser(null);
			toast({
				title: "Sucessfully Logged Out",
				description: "You have been logged out",
			});
		}
	};

	return {
		loginUser,
		signupUser,
		isUserLoggedIn,
		logoutUser,
	};
}

export default useAuth;
