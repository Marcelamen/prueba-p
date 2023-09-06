const express = require('express');
const router = express.Router();

const conexion = require('./database/db.js');

router.get('/', (req, res) => {
    conexion.query('SELECT * FROM users', (error, results) => {
        if (error) {
            throw error;
        } else {
            res.send(results);
        }
    }
    )
})
  //ruta para crear registro
  router.post('/crear', (req, res) => {
    const { nombre, correo, contraseña} = req.body;
    const newItem =[nombre, correo, contraseña];
    const sql= "INSERT INTO users (id,nombre, coreo, contraseña) values (1,?,?,?)"
    console.log(newItem);
    conexion.query(sql, newItem, (err,results ) => {
        if(err) return res.status(500).send (err);
        return res.status(201).json({message:'Registro  creado correctamente'});
    });
});

//ruta para actualizar registro
router.put('/actualizar/:id', (req, res) => {
    const id = req.params.id;
    const nombre = req.body.nombre;
    console.log(nombre);
    const sql = 'UPDATE users SET nombre = ? WHERE id = ?';
    conexion.query(sql, [nombre, id,], (err, result) => {
        if (err) {
            throw err;
        }
        console.log('Regitro actualizado con ID: ${id}')
        res.send('Registro actualizado');
    });

    
        
    })

    //ruta para eliminar registro por id 
    router.delete('/users/:id', (req, res) => {
        const itemId = req.params.id;
        conexion.query ('DELETE FROM users WHERE id =?', itemId, (err, result)=> {
            if (err) return res.status (500).send(err);
            return res.status(200).json ({message:'resgistro eliminado correctamente'});
        });

    })
    



module.exports = router;