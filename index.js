const { dbConnection, db } = require("./database/config");
const express = require("express");
const cors = require("cors");

const port = 3000;

//base de datos
dbConnection();

const app = express();

app.use(cors());

app.get("/getData", (req, res) => {
	const miColeccion = db.collection("ranking");
	
	miColeccion.find({}).toArray((err, data) => {
		if (err) {
			console.log(err);
			res.status(500).send(
				"Error al obtener los datos desde la base de datos"
			);
		} else {
			res.status(200).json(data);
		}
	});
});

app.post("/getData", (req, res) => {
	

	// Aquí guardamos los datos en la base de datos
	const miColeccion = db.collection("ranking");
	console.log(playername)

	const datosAGuardar = {
		
		correctas: req.body.correctas,
		incorrectas: req.body.incorrectas,
	};
	miColeccion.insertOne(datosAGuardar, (err, result) => {
		if (err) {
			console.log(err);
			res.send("Error al guardar los datos en la base de datos");
		} else {
			//console.log(result);
			res.send("Los datos se han guardado correctamente");
			console.log("datos guardados")
		}
	});
});

app.listen(port, () => {
	console.log(`Servidor escuchando en ${port}`);
});
