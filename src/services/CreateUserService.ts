import {connect} from "mongoose";

import User from "../models/User";

import {hash} from "bcryptjs";

require("dotenv").config()

interface IUserRequest {
	name: string;
	email: string;
	password: string;
}

class CreateUserService{
	async execute({name, email, password}:IUserRequest){

		//connect to db
		const db_user = process.env.DB_USER;
		const db_pass = process.env.DB_PASS
	
		await connect(`mongodb+srv://${db_user}:${db_pass}@node-type-jwt.okcvq.mongodb.net/?retryWrites=true&w=majority`);

		//verify if the user exists
		
		const userAlreadyExists = await User.findOne({email: email});

		if(userAlreadyExists){
			throw `user already exists`
		}

		//encrypt the pass

		const hashedPass = await hash(password, 12)

		//create new user
		const createdUser = new User({
			name: name,
			email: email,
			password: hashedPass
		});

		await createdUser.save();
	
		return(createdUser); 
	}
	
}


export default CreateUserService;