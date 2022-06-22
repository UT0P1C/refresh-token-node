import mongoose from "mongoose";
require("dotenv").config()

class connectDatabase {
	async connect (){
		//connect to db
		const db_user = process.env.DB_USER;
		const db_pass = process.env.DB_PASS
	
		await mongoose.connect(`mongodb+srv://${db_user}:${db_pass}@node-type-jwt.okcvq.mongodb.net/?retryWrites=true&w=majority`);
	}
}

export default connectDatabase;