const express = require('express')
const PageController = require("../controllers/pageController")
const pageRouter = express.Router()

pageRouter.get('/', PageController.GetPage)
pageRouter.get("/id", PageController.getLatestPages);
pageRouter.post('/', PageController.createPage)
pageRouter.delete('/:id', PageController.DeletePage)
pageRouter.put('/:id', PageController.updatePage)
pageRouter.get('/:id', PageController.getBookById)

module.exports = pageRouter;