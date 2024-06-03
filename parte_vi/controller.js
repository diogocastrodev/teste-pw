const fs = require("fs");

const jsonFilePath = "./src/data/entities/products.json";

const readJsonFile = () => {
  return fs.readFileSync(jsonFilePath, "utf-8");
};

exports.getAll = async (req, res) => {
  const jsonFile = readJsonFile();
  return res.status(200).send(JSON.parse(jsonFile));
};

exports.getById = async (req, res) => {
  const { id } = req.params;

  const jsonFile = readJsonFile();
  const products = JSON.parse(jsonFile).products;

  const product = products.find((product) => product.id === parseInt(id));

  if (!product) {
    return res.status(404).send({ message: "Product not found" });
  }

  return res.status(200).send(product);
};

exports.create = async (req, res) => {
  const { id, name, price, imgs, description } = req.body;
  const jsonFile = readJsonFile();
  const products = JSON.parse(jsonFile).products;
  const newProduct = { id, name, price, imgs, description };
  products.push(newProduct);
  fs.writeFileSync(jsonFilePath, JSON.stringify({ products }));
  return res.status(201).send(newProduct);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, price, imgs, description } = req.body;

  const jsonFile = readJsonFile();
  const products = JSON.parse(jsonFile).products;

  const productIndex = products.findIndex(
    (product) => product.id === parseInt(id)
  );

  if (productIndex === -1) {
    return res.status(404).send({ message: "Product not found" });
  }

  products[productIndex] = { id: parseInt(id), name, price, imgs, description };

  fs.writeFileSync(jsonFilePath, JSON.stringify({ products }));

  return res.status(200).send(products[productIndex]);
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  const jsonFile = readJsonFile();
  const products = JSON.parse(jsonFile).products;

  const productNew = products.filter((product) => product.id !== parseInt(id));

  fs.writeFileSync(jsonFilePath, JSON.stringify({ products: productNew }));
  return res.status(204).send();
};
