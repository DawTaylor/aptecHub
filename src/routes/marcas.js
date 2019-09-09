const init = models => {
  const router = require("express").Router()
  const marcasController = require("../controllers/marcas")

  router.get("/", marcasController.index(models))
  router.get("/adicionar", marcasController.create(models))
  router.post("/adicionar", marcasController.create(models))
  router.get("/editar/:id", marcasController.update(models))
  router.post("/editar/:id", marcasController.update(models))
  router.get("/excluir/:id", marcasController.remove(models))

  return router
}

module.exports = init