const express = require('express');
const conexion = require('./database/db.js');
const app = express();
const router = require('./router.js')
app.use(express.json())
app.use('/', router);

//iniciar servidor
const port = 4000;
app.listen(port, () => {
    console.log('servidor express en funcionaminto en el puerto ${port}');
});