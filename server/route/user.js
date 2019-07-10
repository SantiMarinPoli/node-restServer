//PAQUETES IMPORTADOS EN NODE
const express = require('express')
const Usuario = require('../models/user')
const bcrypt = require('bcrypt')

//EL APP SE DECLARA EL METODO DEL EXPRESS
const app = express()

//POST MUESTRA DATOS O LISTAR DATOS
app.get('/user', function (req, res) {
    res.send('get user')
  })
  
  //POST UTILIZAN SOLO REGISTROS
  app.post('/user', function (req, res) {
  
      let body = req.body

      //ESTE OBJETO MOSTARA LOS DATOS QUE SON REQUISITOS PARA COMPLETAR LOS DATOS
      let usuario = new Usuario({
          nombre: body.nombre,
          email: body.email,
          password: bcrypt.hashSync(body.password,10),
          role: body.role
      })

      //CUANDO LA CONECCION DEL MONGO NO SE CONECTA ARROJARA UN MENSAJE DE ERROR EN LA CONSOLA
      usuario.save((err,usuarioDB)=>{
          if(err){
                return res.status(400).json({
                  ok: false,
                  err
                })
          }

          res.json({
              ok: true,
              usuario: usuarioDB
          })
      })
    })
  
  //PUT UTILIZAN DE ACTUALIZAR LOS REGISTROS
  app.put('/user/:id', function (req, res) {
      let id = req.params.id
  
      res.json({
          id
      })
    })
  
  //DELETE
  app.delete('/user', function (req, res) {
      res.send('delete user')
    })

module.exports = app