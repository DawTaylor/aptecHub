const { extractErrors } = require("../utils/formattedErrors")
const aptecWeb = require("../api/aptecweb")

const index = ({ Marcas }) => async (req, res) => {
  const marcas = await Marcas.findAll()

  res.render("marcas/index", {
    marcas
  })
}

const create = ({ Marcas }) => async (req, res) => {
  if (req.method === "GET") {
    res.render("marcas/create_form", {
      form: {},
      errors: extractErrors()
    })
  } else {
    try {
      const marca = await Marcas.create(req.body)
      req.flash("success", `A marca ${marca.name} foi criada com sucesso!`)
      res.redirect("/marcas")
    } catch (err) {
      res.render("marcas/create_form", {
        form: req.body,
        errors: extractErrors(err)
      })
    }
  }
}

const update = ({ Marcas }) => async (req, res) => {
  const { id } = req.params

  if (req.method === "GET") {
    const marca = await Marcas.findByPk(id)

    res.render("marcas/edit_form", {
      id,
      form: marca,
      errors: extractErrors()
    })
  } else {
    try {
      const marca = await Marcas.update(req.body, {
        where: {
          id
        }
      })
      req.flash("success", `A marca ${req.body.name} foi editada com sucesso!`)
      res.redirect("/marcas")
    } catch (err) {
      res.render("marcas/edit_form", {
        id,
        form: req.body,
        errors: extractErrors(err)
      })
    }
  }
}

const remove = ({ Marcas }) => async (req, res) => {
  const marca = await Marcas.findByPk(req.params.id)

  Marcas.destroy({
    where: {
      id: req.params.id
    }
  })

  req.flash("into", `A marca ${marca.name} foi excluída!`)

  res.redirect("/marcas")
}

const importProducts = ({ Marcas }) => async (req, res) => {
  const marca = await Marcas.findByPk(req.params.id)

  const produtos = await aptecWeb(marca).products.getAll()
  console.log(produtos[0])

  res.send("import")
}

const sendProducts = ({ Marcas }) => async (req, res) => {
  res.send("send")
}

module.exports = {
  index,
  create,
  update,
  remove,
  importProducts,
  sendProducts
}
