const mongoose = require("mongoose");

const dbConnection = async () => {
	console.log(process.env.DB_CNN);

	try {
		await mongoose.connect(
			"mongodb+srv://mern_user:xrDSNxnDRMvnoHos@rankingdb.gdbblxi.mongodb.net/",
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
			}
		);

		console.log("DB Online");
	} catch (error) {
		console.log(error);
		throw new Error("Error a la hora de inicializar BD");
	}
};
const db = mongoose.connection;

module.exports = {
	dbConnection,
	db,
};
