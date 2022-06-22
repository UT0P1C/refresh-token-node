import User from "../models/User";
import {compare} from "bcryptjs";
import {sign } from "jsonwebtoken";
require("dotenv").config();

interface IUserAuthenticateRequest {
	email: string;
	password: string;
}

class AuthenticateUserService {

	async execute({email, password}:IUserAuthenticateRequest){
		//verify if the user exists
		const userAlreadyExists = await User.findOne({email: email});

		if(!userAlreadyExists){
			throw new Error(`User or pass does'nt match!`)
		}

		//verify if the pass match

		const validPass = await compare(password, userAlreadyExists.password);

		if(!validPass){
			throw new Error(`User or pass does'nt match!`);
		}

		//generate JWT token

		const secret = process.env.SECRET;

		const token = sign(
			{
			id: userAlreadyExists.id
			}, 
			secret);

		return token;

	}


}

export default AuthenticateUserService;