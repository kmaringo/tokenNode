const {response} = require('express')
const bcrypt = require('bcrypt') //Importar libreria para encriptar
const Producto = require('../models/producto')


const getProducto = async(req, res=response) => {
    let mensaje = ''
    try {
        const producto = await Producto.find()
        mensaje = producto
    } catch (error) {
        mensaje = error
    }

   res.json({
        producto:mensaje
    })
    
}

const postProducto = async(req, res = response) =>{

    const body = req.body
    let mensaje = ''
    const producto= new Producto(body) 
    console.log(body)
    try {
        await producto.save()
        mensaje = 'Producto registrado exitosamente'
    } catch (error) {
        mensaje = error
    }

    res.json({
        mensaje
    })
   
}

const putProducto = async (req, res = response) => {
    const body = req.body;
    console.log(body);

    let mensaje = '';

    try {
        if (body.tipoModificacion == 'Unitaria') {
            await Producto.findOneAndUpdate(
                { _id: body._id },
                {
                    nombre: body.nombre,
                    descripcion: body.descripcion,
                    precio: body.precio, 
                    estado: body.estado
                }
            );
            mensaje = 'Producto modificado exitosamente.';
        } else {
            await Producto.updateMany(
                { _id: body._id },
                {
                    nombre: body.nombre,
                    descripcion: body.descripcion,
                    precio: body.precio, 
                    estado: body.estado 
                }
            );
            mensaje = 'Producto modificado exitosamente.';
        }
    } catch (error) {
        mensaje = error;
    }

    res.json({
        producto: mensaje
    });
};

const deleteProducto = async(req, res = response) =>{
    const body = req.body
    let mensaje = ''

    try {
        await Producto.findOneAndDelete({_id:body._id})
        mensaje = 'Eliminado exitosamente'
    } catch (error) {
        mensaje = error
    }
    
    res.json({
        producto:mensaje
    })
   
}

module.exports = {
    getProducto,
    postProducto,
    putProducto,
    deleteProducto
}