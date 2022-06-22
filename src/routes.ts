import {Router} from "express";
import AuthenticateUserController from "./controllers/AuthenticateUserController";
import CreateUserController from "./controllers/CreateUserController";

const routes = Router();

const createUserController = new CreateUserController;
const authenticateUserController = new AuthenticateUserController;

routes.post("/signup", createUserController.handle);
routes.post("/signin", authenticateUserController.handle)

export default routes;