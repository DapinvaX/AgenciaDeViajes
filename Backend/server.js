// Importamos las bibliotecas necesarias
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

// Creamos el servidor
const app = express();

// Configuramos el servidor
app.use(bodyParser.json());

// Conectamos a la base de datos
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "secret",
  database: "agencia_viajes",
});

// Escuchamos las peticiones
app.get("/", (req, res) => {
  // Devolvemos la página principal de la web
  res.sendFile(__dirname + "/index.html");
});

// Procesamos las peticiones de pago
app.post("/pago", (req, res) => {
  // Obtenemos los datos del pago
  const datos = req.body;

  // Validamos los datos del pago
  if (!datos.tarjeta || !datos.fecha_caducidad || !datos.cvv) {
    res.status(400).send("Datos de pago incorrectos");
    return;
  }

  // Procesamos el pago
  const resultado = procesarPago(datos);

  // Devolvemos el resultado del pago
  if (resultado.ok) {
    res.status(200).send({
      ok: true,
      mensaje: "Pago realizado correctamente",
    });
  } else {
    res.status(400).send({
      ok: false,
      mensaje: resultado.mensaje,
    });
  }
});

// Procesamos los pagos
function procesarPago(datos) {
  // Conectamos a la pasarela de pagos
  const paycomet = new Paycomet({
    apiKey: "YOUR_API_KEY",
  });

  // Procesamos el pago
  const resultado = paycomet.procesarPago({
    tarjeta: datos.tarjeta,
    fecha_caducidad: datos.fecha_caducidad,
    cvv: datos.cvv,
  });

  // Devolvemos el resultado del pago
  return resultado;
}

// Iniciamos el servidor
app.listen(3000);
