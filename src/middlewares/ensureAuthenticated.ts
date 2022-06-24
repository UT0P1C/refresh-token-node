import { Request, Response, NextFunction } from "express";
require ("dotenv").config();

import {verify} from "jsonwebtoken";

export function ensureAuthenticated(req:Request, res:Response, next:NextFunction){

	//get the token from the bearer-token
	const bearerToken = req.headers.authorization;

	//check if the token exists
	if(!bearerToken){
		return res.status(401).json({
			error: "Unauthorized, missing Token",
		});
	}

	//remove the "bearer" from the token
	const [, token] = bearerToken.split(" ");

	//verify if the token is valid
	try{
		verify(token, process.env.SECRET);
		return next();
	}catch(err){
		return res.status(401).json({error: "Invalid Token"});
	}

}