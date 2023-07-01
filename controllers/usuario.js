const {response} = require('express')
const bcrypt = require('bcrypt') //Importar libreria para encriptar
const Usuario = require('../models/usuario')



const getUsuario = async(req, res=response) => {
    let mensaje = ''
    try {

        const usuarios = await Usuario.find()
        mensaje = usuarios
    } catch (error) {
        mensaje = error
    }

   res.json({
        usuarios:mensaje
    })
    
}

const postUsuario = async(req, res = response) =>{

    const body = req.body //Desestructuración
    let mensaje = ''
    const usuario = new Usuario(body) // Crear el objeto
    usuario.password = bcrypt.hashSync(body.password, 10) //Encriptar

    console.log(body)
    try {
        await usuario.save()
        mensaje = 'Usuario registrado exitosamente'
    } catch (error) {
        mensaje = error
    }

    res.json({
        mensaje
    })
   
}

const putUsuario = async(req, res = response) =>{

    const body = req.body //Desestructuración
     console.log(body)

    let mensaje = ''

    try {
        if(body.tipoModificacion == 'Unitaria'){

            await Usuario.findOneAndUpdate({_id:body._id}, {rol:body.rol, estado:body.estado})

            mensaje = 'Usuario modificado exitosamente. Modificación: Sencilla'
        }
        else{
            await Usuario.updateMany({password:body.password}, {rol:body.rol, estado:body.estado})
            mensaje = 'Usuario modificado exitosamente. Modificación: Múltiple'
        }


    } catch (error) {
        mensaje = error
    }
    
    res.json({
        mensaje:mensaje
    })
   
}

const deleteUsuario = async(req, res = response) =>{
    //Actualización de datos
    const body = req.body//Desestructuración
    let mensaje = ''

    try {
        await Usuario.deleteOne({_id:body._id})
        mensaje = 'Eliminado exitosamente'
    } catch (error) {
        mensaje = error
    }

    res.json({
        mensaje
    })
   
}

module.exports = {
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario
}



