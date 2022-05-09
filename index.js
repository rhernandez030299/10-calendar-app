const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');
//CREAR EL SERVIDOR DE EXPRESS
const app = express();
//base de datos
dbConnection();

//cors
app.use(cors())

//Directorio publico
app.use( express.static('public') )

//Lectura y parseo del body
app.use( express.json() )

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
//Rutas
// app.get('/', (req, res) => {

//   res.json({
//     ok: true
//   })

// });

//Escuchar peticiones
app.listen( process.env.PORT, () =>{
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})