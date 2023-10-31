const connection = require("./src/db/connection");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

connection();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rutas
const UserRoutes = require("./src/routes/user");

app.use("/api/user", UserRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Aplicacion iniciada!!",
  });
});

app.listen(port, () => {
  console.log("Servidor iniciado en el puerto: ", port);
});
