import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { create } from "zustand";

interface Store {
	user?: Object | null;
	isUserLoggedIn: () => Promise<string | undefined>;

	signupUser: (
		user: { email: string; password: string; username: string },
		callback: (uid: string) => void
	) => void;
	loginUser: (uuid: string, callback?: () => void) => void;
	logoutUser: () => void;
}

export const useStore = create<Store>((set) => ({
	user: null,

	isUserLoggedIn: async () => {
		const supabase = createClientComponentClient();

		const { data, error } = await supabase.auth.getUser();

		if (data?.user) {
			return data.user.id;
		} else {
			return;
		}
	},
	signupUser: async (user, callback) => {
		const supabase = createClientComponentClient();

		// Check if username is taken
		const profileData = await supabase
			.from("Profile")
			.select("*")
			.eq("username", user.username);
		if (profileData?.data?.length) {
			alert("Username is taken");
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
			// Handle Errors TODO: Imeplement toastr errors
			alert(error.message);
			return;
		} else {
			// Insert user into profile table
			const { error } = await supabase
				.from("Profile")
				.insert({ UID: data?.user?.id, username: user.username });

			if (error) {
				// Handler Errors
				alert(error.message);
				return;
			} else {
				if (data?.user?.id) callback(data?.user?.id);
			}
		}
	},
	loginUser: async (uuid, callback) => {
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
			set((state) => ({ user: data[0] }));
			if (callback) callback();
		}
	},
	logoutUser: async () => {
		const supabase = createClientComponentClient();

		const { error } = await supabase.auth.signOut();

		if (error) {
			// Handle the error appropriately
			console.error("Error signing out user:", error);
		} else {
			// Clear user
			set((state) => ({ user: null }));
		}
	},
}));
