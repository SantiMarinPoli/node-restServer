require('./config/config')

const express = require('express')
const app = express()

const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())



app.get('/user', function (req, res) {
  res.send('get user')
})

//POST UTILIZAN SOLO REGISTROS
app.post('/user', function (req, res) {

    let body = req.body

    if(body.nombre === undefined){

        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        })


    }else{
        res.json({
            persona : body
        })
    }


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

app.listen(process.env.PORT,()=>{
    console.log("Escuchando el puerto: ",process.env.PORT)
})