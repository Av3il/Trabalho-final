import { DataTypes } from "sequelize";
import mysql from "./mysql.js";

const Cliente = mysql.define("Cliente", {
  idCliente: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  telefone: { type: DataTypes.STRING(20) },
  senha: { type: DataTypes.STRING(255), allowNull: false },
  endereco: { type: DataTypes.TEXT },
  data_cadastro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

const Produto = mysql.define("Produto", {
  idProduto: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING(100), allowNull: false },
  descricao: { type: DataTypes.TEXT },
  preco: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  qtEstoque: { type: DataTypes.INTEGER, defaultValue: 0 },
  marca: { type: DataTypes.STRING(50) },
  data_cadastro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

const Categoria = mysql.define("Categoria", {
  idCategoria: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  descricao: { type: DataTypes.TEXT },
});

const Pedido = mysql.define("Pedido", {
  idPedido: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  status: { type: DataTypes.STRING(50), defaultValue: "Pendente" },
  preco_total: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 },
  forma_pagamento: { type: DataTypes.STRING(50) },
  data_pedido: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

Pedido.belongsTo(Cliente, { foreignKey: "idCliente" });
Cliente.hasMany(Pedido, { foreignKey: "idCliente" });

// ✅ Correção da tabela ItemPedido
const ItemPedido = mysql.define("ItemPedido", {
  idItemPedido: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  idProduto: { type: DataTypes.INTEGER, allowNull: false }, // 🔹 agora é FK
  quantidade: { type: DataTypes.INTEGER, allowNull: false },
  preco_unitario: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  subtotal: { type: DataTypes.DECIMAL(10, 2) }, // calculado no app
});

// 🔹 Relacionamentos
ItemPedido.belongsTo(Pedido, { foreignKey: "idPedido" });
Pedido.hasMany(ItemPedido, { foreignKey: "idPedido" });

ItemPedido.belongsTo(Produto, { foreignKey: "idProduto" });
Produto.hasMany(ItemPedido, { foreignKey: "idProduto" });

const AvaliacaoProduto = mysql.define("AvaliacaoProduto", {
  idAvaliacao: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  avaliacao: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 5 },
  },
  comentario: { type: DataTypes.TEXT },
  data_avaliacao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

AvaliacaoProduto.belongsTo(Produto, { foreignKey: "idProduto" });
Produto.hasMany(AvaliacaoProduto, { foreignKey: "idProduto" });

AvaliacaoProduto.belongsTo(Cliente, { foreignKey: "idCliente" });
Cliente.hasMany(AvaliacaoProduto, { foreignKey: "idCliente" });

// Relação n:n entre Produto e Categoria
Produto.belongsToMany(Categoria, { through: 'ProdutosCategorias', foreignKey: 'idProduto', otherKey: 'idCategoria' });
Categoria.belongsToMany(Produto, { through: 'ProdutosCategorias', foreignKey: 'idCategoria', otherKey: 'idProduto' });

//mysql.sync();
mysql.sync({ alter: true });

export { Cliente, Produto, Pedido, ItemPedido, AvaliacaoProduto, Categoria, mysql};
