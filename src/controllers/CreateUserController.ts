import {Request, Response} from "express";
import CreateUserService from "../services/CreateUserService";

class CreateUserController{
	async handle(req:Request, res:Response){
		try{
			const {name, email, password} = req.body;
	
			const createUserService = new CreateUserService();
	
			const user = await createUserService.execute({
					name,
					email,
					password
			});
		
			return res.status(200).json(user);
		}catch(err){
			console.log(err);
			return res.json({error: err})
		}

	}
}

export default CreateUserController;