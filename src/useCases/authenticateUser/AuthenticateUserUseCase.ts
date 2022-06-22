import {connect} from "mongoose";

import User from "../../models/User";

require("dotenv").config()

interface IUserRequest {
	name: string;
	email: string;
	password: string;
}

class AuthenticateUserUseCase{
	async execute({name, email, password}:IUserRequest){

		//connect to db
		const db_user = process.env.DB_USER;
		const db_pass = process.env.DB_PASS
	
		await connect(`mongodb+srv://${db_user}:${db_pass}@node-type-jwt.okcvq.mongodb.net/?retryWrites=true&w=majority`);

		//verify if the user exists
		
		const userAlreadyExists = await User.findOne({email: email});

		if(userAlreadyExists){
			throw new Error("the user already exists");
		}

		//create new user
		const createUser = new User({
			name: name,
			email: email,
			password: password
		});

		await createUser.save();
	
		console.log(createUser); 
	}
	
}


export default AuthenticateUserUseCase;