import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import * as types from "./action-types";

export function loginUser(uuid: string, callback: any) {
	return async (dispatch: any) => {
		const supabase = createClientComponentClient();

		dispatch({ type: types.USER + "_PENDING" });

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
			dispatch({
				type: types.USER + "_FULFILLED",
				data: data[0],
			});
			if (typeof callback === "function") callback();
		}
	};
}
export function logoutUser(callback: any) {
	return async (dispatch: any) => {
		const supabase = createClientComponentClient();

		dispatch({ type: types.USER + "_PENDING" });

		const { error } = await supabase.auth.signOut();

		if (error) {
			// Handle the error appropriately
			console.error("Error fetching data:", error);
		} else {
			// Clear user
			dispatch({
				type: types.USER + "_FULFILLED",
				data: null,
			});
			if (typeof callback === "function") callback();
		}
	};
}
