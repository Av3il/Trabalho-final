import "../app/css/menu.css";

function Menu() {
    return (
        <nav className="main-nav">
            <ul className="nav-list">
                <li><a href="/">Home</a></li>
                <li><a href="/Cliente">Clientes</a></li>
                <li><a href="/Produto">Produtos</a></li>
                <li><a href="/Categoria">Categorias</a></li>
                <li><a href="/Pedido">Pedidos</a></li>
                <li><a href="/ItemPedido">Itens de Pedido</a></li>
                <li><a href="/AvaliacaoProduto">Avaliações de Produtos</a></li>
            </ul>
        </nav>
    );
}

export default Menu;
