const productsRouter = require("express").Router(); // Importar o Router da biblioteca express
const controller = require("../controllers/products"); // Importar os controllers (Funções que fazem a lógica de cada rota)
const authMiddleware = require("../middlewares/auth/auth"); // Importar o middleware de autenticação (Função intermediária para verfiicar sempre que houver pedido para a rota)

productsRouter.get("/", controller.getAll); // Rota para buscar todos os produtos
productsRouter.get("/{id}", controller.getById); // Rota para buscar um produto específico pelo id
productsRouter.post("/", authMiddleware, controller.create); // Rota para criar um novo produto (Necessário estar autenticado)
productsRouter.update("/{id}", authMiddleware, controller.update); // Rota para atualizar um produto pelo id (Necessário estar autenticado)
productsRouter.delete("/{id}", authMiddleware, controller.delete); // Rota para apagar um produto  pelo id(Necessário estar autenticado)

module.exports = productsRouter; // Exportar o router para ser utilizado no ficheiro principal ou em outro router
