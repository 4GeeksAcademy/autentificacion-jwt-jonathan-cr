import React, { useEffect, useContext } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import { Context } from "../store/appContext.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL;

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file");

			const response = await fetch(backendUrl + "/api/hello");
			const data = await response.json();

			if (response.ok) actions.setHello(data.message);

			return data;
		} catch (error) {
			console.error(
				`Could not fetch the message from the backend.
                Please check if the backend is running and the backend port is public.`,
				error
			);
		}
	};

	useEffect(() => {
		loadMessage();
	}, []);

	return (
		<div className="text-center mt-5">
			<h1 className="display-4">Hello Rigo!!</h1>
			<p className="lead">
				<img src={rigoImageUrl} className="img-fluid rounded-circle mb-3" alt="Rigo Baby" />
			</p>
			<div className="alert alert-info">
				{store.message && store.message.text ? (
					<span>{store.message.text}</span>
				) : (
					<span className="text-danger">
						Loading message from the backend (make sure your python 🐍 backend is running)...
					</span>
				)}
			</div>
		</div>
	);
};