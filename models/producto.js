//Importar el esquema mongoose
const { Schema, model } = require("mongoose");

//Definir la estructura de la colección
const ProductoSchema = Schema({

  nombre: {
    type: String,
    validate: {
      validator: (value) => {
        const regExpName = /([A-Za-z0-9\s])/;
        return regExpName.test(value);
      },
      message: (value) => `el nombre ${value} no es válido`,
    },
    required: [true, "El nombre es obligatorio"],
  },

  descripcion: {
    type: String,
    validate: {
      validator: (value) => {
        const regExpName = /([A-Za-z0-9\s])/;
        return regExpName.test(value);
      },
      message: (value) => `el nombre ${value} no es válido`,
    },
    required: [true, "La descripción es obligatoria"],
  },

  precio: {
    type: Number,
    validate: {
      validator: (value) => {
        return value > 0;
      },
      message: (value) => `${value} no es un precio valido`,
    },
    required: [true, "El precio es obligatorio"],
  },

  estado: {
    type: String,
    validate: {
      validator: (value) => {
        return value === "Activo" || value === "Inactivo";
      },
      message: (value) => `${value} no es un estado válido`,
    },
    required: [true, "El estado es obligatorio"],
  }
});

module.exports = model("Producto", ProductoSchema);
