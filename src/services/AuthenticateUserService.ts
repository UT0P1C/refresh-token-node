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
			throw `User or pass does'nt match!`
		}

		//verify if the pass match

		const validPass = await compare(password, userAlreadyExists.password);

		if(!validPass){
			throw `User or pass does'nt match!`;
		}

		//generate JWT token

		const secret = process.env.SECRET;

		const token = sign(
			{
			id: userAlreadyExists.id
			}, 
			secret, {
				expiresIn: "20s"
			});

		return token;

	}


}

export default AuthenticateUserService;