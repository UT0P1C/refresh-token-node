import {Request, Response} from "express";
import AuthenticateUserService from "../services/AuthenticateUserService";

class AuthenticateUserController {
	async handle(req:Request, res:Response){	
		try{	
		const {email, password} = req.body;

		const authenticateUserService = new AuthenticateUserService();

		const token = await authenticateUserService.execute({
			email,
			password
		});

		return res.json({token: token});
		}catch(err){
			console.log(err);
		}
	}

}

export default AuthenticateUserController;