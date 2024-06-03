const express = require("express"); // Importar a biblioteca express
const app = express(); // Inicializar a aplicação express

const productsRouter = require("./routes/products"); // Importar o router de produtos

app.use(express.json()); // Middleware para fazer o parse do body para json

app.use("/products", productsRouter); // Definir a rota base para os produtos

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
