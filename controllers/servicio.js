const {response} = require('express')
const bcrypt = require('bcrypt') //Importar libreria para encriptar
const Servicio = require('../models/servicio')


const getServicio = async(req, res=response) => {
    let mensaje = ''
    try {
        const servicio = await Servicio.find()
        mensaje = servicio
    } catch (error) {
        mensaje = error
    }

   res.json({
        servicio:mensaje
    })
    
}

const postServicio = async(req, res = response) =>{

    const body = req.body
    let mensaje = ''
    const servicio= new Servicio(body) 
    console.log(body)
    try {
        await servicio.save()
        mensaje = 'Servicio registrado exitosamente'
    } catch (error) {
        mensaje = error
    }

    res.json({
        mensaje
    })
   
}

const putServicio = async (req, res = response) => {
    const body = req.body;
    console.log(body);

    let mensaje = '';

    try {
        if (body.tipoModificacion == 'Unitaria') {
            await Servicio.findOneAndUpdate(
                { _id: body._id },
                {
                    nombre: body.nombre,
                    descripcion: body.descripcion,
                    precio: body.precio, 
                    estado: body.estado
                }
            );
            mensaje = 'Servicio modificado exitosamente.';
        } else {
            await Servicio.updateMany(
                { _id: body._id },
                {
                    nombre: body.nombre,
                    descripcion: body.descripcion,
                    precio: body.precio,
                    estado: body.estado
                }
            );
            mensaje = 'Servicio modificado exitosamente.';
        }
    } catch (error) {
        mensaje = error;
    }

    res.json({
        mensaje: mensaje
    });
};

const deleteServicio = async(req, res = response) =>{
    const body = req.body
    let mensaje = ''

    try {
        await Servicio.findOneAndDelete({_id:body._id})
        mensaje = 'Eliminado exitosamente'
    } catch (error) {
        mensaje = error
    }
    
    res.json({
        servicio:mensaje
    })
   
}

module.exports = {
    getServicio,
    postServicio,
    putServicio,
    deleteServicio
}