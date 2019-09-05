const MarcasModel = (sequelize, DataType) => {
  const MarcaSequelize = sequelize.define("Marcas", {
    name: {
      type: DataType.STRING,
      validate: {
        notEmpty: {
          msg: "Preencha o campo Nome"
        }
      }
    },
    email: {
      type: DataType.STRING,
      validate: {
        notEmpty: {
          msg: "Preencha o campo E-mail"
        },
        isEmail: {
          msg: "Verifique se o e-mail está correto"
        },
        len: {
          args: [3, 60],
          msg: "O e-mail deve conter mais de 3 caracteres"
        }
      }
    }
  })

  return MarcaSequelize
}

module.exports = MarcasModel
