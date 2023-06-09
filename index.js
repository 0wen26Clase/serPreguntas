const { dbConnection, db } = require("./database/config");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

//base de datos
dbConnection();

app.use(express.static("public"));
app.use(cors());

app.use(express.json());

//rutas

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
app.get("*", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});
app.post("/getData", (req, res) => {
	console.log("Player name: " + req.body.playerName);
	console.log("correctas: " + req.body.correctas);
	console.log("incorrectas: " + req.body.incorrectas);

	// Aquí guardamos los datos en la base de datos
	const miColeccion = db.collection("ranking");

	const datosAGuardar = {
		playername: req.body.playerName,
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
		}
	});
});

app.listen(port, () => {
	console.log(`Servidor escuchando en ${port}`);
});
