import("express-async-errors");

import express, { NextFunction } from "express";

import routes from "./routes";

import connectDatabase from "./database";

const app = express();

app.use(express.json());

const database = new connectDatabase();

database.connect();

app.use(routes);

app.use((error, request, response, next) => {
	return response.json({
		status: "Error",
		message: error.message
	})
});

app.listen(3000, () => {
	console.log("server running in port 3000");
});