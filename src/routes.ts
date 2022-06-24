import {Router} from "express";
import AuthenticateUserController from "./controllers/AuthenticateUserController";
import CreateUserController from "./controllers/CreateUserController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const routes = Router();

const createUserController = new CreateUserController;
const authenticateUserController = new AuthenticateUserController;

routes.post("/signup", createUserController.handle);
routes.post("/signin", authenticateUserController.handle);

routes.get("/digimons", ensureAuthenticated, (req, res) => {
	return res.json([
		{id: 1, digimon: "agumon"},
		{id: 2, digimon: "gabumon"},
		{id: 3, digimon: "patamon"},
		{id: 4, digimon: "tentomon"},
		{id: 5, digimon: "palmon"},
		{id: 6, digimon: "pyiomon"},
		{id: 7, digimon: "gomamon"},
	]);
});

export default routes;