import reducers from "@/store/reducers";
import { configureStore, Middleware } from "@reduxjs/toolkit";
import logger from "redux-logger";

export const makeStore = () => {
	return configureStore({
		reducer: reducers,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger as Middleware )
	});
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
