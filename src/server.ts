import express from "express";

import AuthenticateUserUseCase from "./useCases/authenticateUser/AuthenticateUserUseCase";

const app = express();

const user = {
	name: "Jao",
	email: "asdre@gmail.com",
	password: "g0dut0p1c"
}

const connect = new AuthenticateUserUseCase();

connect.execute(user);

app.listen(3000, () => {
	console.log("server running in port 3000");
});